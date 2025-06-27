const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  comments: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' }, text: String, createdAt: { type: Date, default: Date.now } }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', TaskSchema);
