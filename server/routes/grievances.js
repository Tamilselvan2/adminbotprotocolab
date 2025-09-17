const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createGrievance,
  getGrievances,
  getGrievanceById,
  respondToGrievance,
  addComment,
  repostGrievance,
} = require('../controllers/grievanceController');

// @route   POST api/grievances
// @desc    Create a grievance
// @access  Private
router.post('/', auth, createGrievance);

// @route   PUT api/grievances/respond/:id
// @desc    Respond to a grievance
// @access  Private (authority)
router.put('/respond/:id', auth, respondToGrievance);

// @route   POST api/grievances/comment/:id
// @desc    Comment on a grievance
// @access  Private
router.post('/comment/:id', auth, addComment);

// @route   PUT api/grievances/repost/:id
// @desc    Repost a grievance
// @access  Private
router.put('/repost/:id', auth, repostGrievance);

// @route   GET api/grievances
// @desc    Get all grievances
// @access  Public
router.get('/', getGrievances);

// @route   GET api/grievances/:id
// @desc    Get grievance by ID
// @access  Public
router.get('/:id', getGrievanceById);

module.exports = router;
