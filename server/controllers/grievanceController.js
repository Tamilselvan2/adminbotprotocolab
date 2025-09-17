const Grievance = require('../models/Grievance');
const Comment = require('../models/Comment');
const User = require('../models/User');
const Authority = require('../models/Authority');

exports.createGrievance = async (req, res) => {
  const { title, description, location, authorityId } = req.body;

  try {
    const user = await User.findById(req.user.id).select('-password');
    const authority = await Authority.findById(authorityId);

    if (!authority) {
      return res.status(404).json({ msg: 'Authority not found' });
    }

    const newGrievance = new Grievance({
      title,
      description,
      location,
      createdBy: user.id,
      authority: authority.id,
    });

    const grievance = await newGrievance.save();
    res.json(grievance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.respondToGrievance = async (req, res) => {
  const { status, deadline } = req.body;

  try {
    const grievance = await Grievance.findById(req.params.id);

    if (!grievance) {
      return res.status(404).json({ msg: 'Grievance not found' });
    }

    // Check if user is in the authority group
    const authority = await Authority.findById(grievance.authority);
    if (!authority.members.includes(req.user.id)) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    grievance.status = status;
    if (deadline) {
      grievance.deadline = deadline;
    }

    await grievance.save();
    res.json(grievance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.addComment = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const grievance = await Grievance.findById(req.params.id);

    if (!grievance) {
      return res.status(404).json({ msg: 'Grievance not found' });
    }

    const newComment = new Comment({
      text: req.body.text,
      createdBy: user.id,
      grievance: req.params.id,
    });

    const comment = await newComment.save();

    res.json(comment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.repostGrievance = async (req, res) => {
  try {
    const grievance = await Grievance.findById(req.params.id);

    if (!grievance) {
      return res.status(404).json({ msg: 'Grievance not found' });
    }

    // Logic to check if reposting is allowed
    const now = new Date();
    const createdAt = new Date(grievance.createdAt);
    const hoursSinceCreation = (now - createdAt) / (1000 * 60 * 60);

    if (grievance.status === 'open' && hoursSinceCreation < 24) {
      return res.status(400).json({ msg: 'Cannot repost within 24 hours of creation if no response' });
    }

    if (grievance.deadline) {
      const deadline = new Date(grievance.deadline);
      if (now < deadline) {
        return res.status(400).json({ msg: 'Cannot repost before the deadline has passed' });
      }
    }

    grievance.reposts += 1;
    grievance.lastRepostedAt = now;

    // Potentially escalate here or in a separate service
    if (grievance.reposts > 2) {
      grievance.status = 'escalated';
      // Find higher authority and assign
    }

    await grievance.save();
    res.json(grievance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find().sort({ createdAt: -1 });
    res.json(grievances);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getGrievanceById = async (req, res) => {
  try {
    const grievance = await Grievance.findById(req.params.id);

    if (!grievance) {
      return res.status(404).json({ msg: 'Grievance not found' });
    }

    const comments = await Comment.find({ grievance: req.params.id }).populate('createdBy', ['name']).sort({ createdAt: -1 });

    res.json({ grievance, comments });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Grievance not found' });
    }
    res.status(500).send('Server Error');
  }
};
