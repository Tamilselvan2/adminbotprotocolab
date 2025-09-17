const mongoose = require('mongoose');

const AuthoritySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: Number,
    required: true,
    default: 1,
  },
  higherAuthority: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Authority',
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Authority', AuthoritySchema);
