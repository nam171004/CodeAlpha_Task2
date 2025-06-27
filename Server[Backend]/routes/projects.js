const express = require('express');
const Project = require('../models/Project');
const { io } = require('../server');

const router = express.Router();

// Create Project
router.post('/', async (req, res) => {
  const { name, description, createdBy, members } = req.body;
  const project = new Project({ name, description, createdBy, members });
  await project.save();
  
  // Emit event for real-time updates
  io.emit('projectCreated', project);
  
  res.status(201).json(project);
});

// Get Projects
router.get('/', async (req, res) => {
  const projects = await Project.find().populate('members').populate('createdBy');
  res.json(projects);
});

module.exports = router;
