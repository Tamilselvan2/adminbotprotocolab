const mongoose = require('mongoose');

const GrievanceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  authority: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Authority',
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved', 'escalated'],
    default: 'open',
  },
  deadline: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resolvedAt: {
    type: Date,
  },
  reposts: {
    type: Number,
    default: 0,
  },
  lastRepostedAt: {
    type: Date,
  },
});

module.exports = mongoose.model('Grievance', GrievanceSchema);
