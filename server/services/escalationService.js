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
        grievance.warnings += 1;
        console.log(`Grievance ${grievance._id} missed its deadline. Warning ${grievance.warnings} issued.`);

        if (grievance.warnings >= 2) {
            console.log(`Grievance ${grievance._id} has ${grievance.warnings} warnings. Escalating.`);
            grievance.status = 'escalated';
            needsUpdate = true;
        } else {
            // Reset deadline for the current authority to respond again
            grievance.deadline = undefined;
            grievance.status = 'open'; // Re-open for the current authority to give a new deadline
        }
      }
    }

    if (needsUpdate) {
        const currentAuthority = await Authority.findById(grievance.authority);
        if (currentAuthority && currentAuthority.higherAuthority) {
            grievance.authority = currentAuthority.higherAuthority;
            grievance.warnings = 0; // Reset warnings for new authority
            grievance.status = 'open'; // Re-open for new authority
            console.log(`Grievance ${grievance._id} escalated to ${currentAuthority.higherAuthority}.`);
        } else {
            console.log(`Grievance ${grievance._id} has no higher authority to escalate to.`);
            // Handle cases with no higher authority, maybe notify admins
        }
    }

    if (grievance.isModified()) {
        await grievance.save();
    }
  }
};

const startEscalationService = () => {
  // Schedule to run every hour
  cron.schedule('0 * * * *', checkAndEscalateGrievances);
};

module.exports = { startEscalationService };
