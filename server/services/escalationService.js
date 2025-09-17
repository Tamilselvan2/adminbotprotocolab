const cron = require('node-cron');
const Grievance = require('../models/Grievance');
const Authority = require('../models/Authority');

const checkAndEscalateGrievances = async () => {
  console.log('Running escalation check...');
  const grievances = await Grievance.find({ status: { $in: ['open', 'in-progress'] } });

  for (const grievance of grievances) {
    const now = new Date();
    let needsUpdate = false;

    // Escalation for no response within 24 hours
    if (grievance.status === 'open') {
      const createdAt = new Date(grievance.createdAt);
      const hoursSinceCreation = (now - createdAt) / (1000 * 60 * 60);
      if (hoursSinceCreation > 24) {
        console.log(`Grievance ${grievance._id} has no response in 24 hours. Escalating.`);
        grievance.status = 'escalated';
        needsUpdate = true;
      }
    }

    // Escalation for missed deadline
    if (grievance.status === 'in-progress' && grievance.deadline) {
      const deadline = new Date(grievance.deadline);
      if (now > deadline) {
        console.log(`Grievance ${grievance._id} missed its deadline. Escalating.`);
        grievance.status = 'escalated';
        needsUpdate = true;
      }
    }

    if (needsUpdate) {
        const currentAuthority = await Authority.findById(grievance.authority);
        if (currentAuthority && currentAuthority.higherAuthority) {
            grievance.authority = currentAuthority.higherAuthority;
            console.log(`Grievance ${grievance._id} escalated to ${currentAuthority.higherAuthority}.`);
        } else {
            console.log(`Grievance ${grievance._id} has no higher authority to escalate to.`);
            // Handle cases with no higher authority, maybe notify admins
        }
      await grievance.save();
    }
  }
};

const startEscalationService = () => {
  // Schedule to run every hour
  cron.schedule('0 * * * *', checkAndEscalateGrievances);
};

module.exports = { startEscalationService };
