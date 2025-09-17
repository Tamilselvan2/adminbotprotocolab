const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {
  getAuthorities,
  createAuthority,
  updateAuthority,
  deleteAuthority,
} = require('../controllers/authorityController');

// @route   GET api/authorities
// @desc    Get all authorities
// @access  Public
router.get('/', getAuthorities);

// @route   POST api/authorities
// @desc    Create an authority
// @access  Admin
router.post('/', [auth, admin], createAuthority);

// @route   PUT api/authorities/:id
// @desc    Update an authority
// @access  Admin
router.put('/:id', [auth, admin], updateAuthority);

// @route   DELETE api/authorities/:id
// @desc    Delete an authority
// @access  Admin
router.delete('/:id', [auth, admin], deleteAuthority);

module.exports = router;
