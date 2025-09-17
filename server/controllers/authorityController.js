const Authority = require('../models/Authority');
const User = require('../models/User');

// @desc    Get all authorities
// @route   GET /api/authorities
// @access  Public
exports.getAuthorities = async (req, res) => {
  try {
    const authorities = await Authority.find().populate('members', 'name email');
    res.json(authorities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create an authority
// @route   POST /api/authorities
// @access  Admin
exports.createAuthority = async (req, res) => {
  const { name, level, higherAuthority } = req.body;
  try {
    const newAuthority = new Authority({
      name,
      level,
      higherAuthority,
    });
    const authority = await newAuthority.save();
    res.json(authority);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update an authority
// @route   PUT /api/authorities/:id
// @access  Admin
exports.updateAuthority = async (req, res) => {
  const { name, level, higherAuthority, members } = req.body;
  try {
    let authority = await Authority.findById(req.params.id);
    if (!authority) {
      return res.status(404).json({ msg: 'Authority not found' });
    }

    authority.name = name || authority.name;
    authority.level = level || authority.level;
    authority.higherAuthority = higherAuthority || authority.higherAuthority;

    if (members) {
      authority.members = members;
    }

    authority = await Authority.findByIdAndUpdate(req.params.id, { $set: authority }, { new: true });

    res.json(authority);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete an authority
// @route   DELETE /api/authorities/:id
// @access  Admin
exports.deleteAuthority = async (req, res) => {
  try {
    let authority = await Authority.findById(req.params.id);
    if (!authority) {
      return res.status(404).json({ msg: 'Authority not found' });
    }

    await Authority.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Authority removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
