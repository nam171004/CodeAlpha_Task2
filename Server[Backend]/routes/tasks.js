const express = require('express');
const Task = require('../models/task');
const { io } = require('../server');

const router = express.Router();
// Create Task
router.post('/', async (req, res) => {
  const { title, description, assignedTo, project } = req.body;
  const task = new Task({ title, description, assignedTo, project });
  await task.save();
  
  // Emit event for real-time updates
  io.to(project).emit('taskCreated', task);
  
  res.status(201).json(task);
});

// Get Tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find().populate('assignedTo').populate('project');
  res.json(tasks);
});

// Add Comment
router.post('/:taskId/comments', async (req, res) => {
  const { taskId } = req.params;
  const { user, text } = req.body;
  
  const task = await Task.findById(taskId);
  task.comments.push({ user, text });
  await task.save();
  
  // Emit event for real-time updates
  io.to(task.project).emit('commentAdded', { taskId, user, text });
  
  res.status(201).json(task);
});

module.exports = router;
