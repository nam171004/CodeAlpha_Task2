import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ projectId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userId = JSON.parse(atob(token.split('.')[1])).id; // Decode token to get user ID

    const response = await axios.post('http://localhost:5000/api/tasks', {
      title,
      description,
      assignedTo,
      project: projectId
    });

    setTitle('');
    setDescription('');
    setAssignedTo('');
    // Optionally, refresh the task list or redirect
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task Description" required />
      <input type="text" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} placeholder="Assign to User ID" required />
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
