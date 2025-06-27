import React, { useState } from 'react';
import axios from 'axios';

const ProjectForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userId = JSON.parse(atob(token.split('.')[1])).id; // Decode token to get user ID

    await axios.post('http://localhost:5000/api/projects', {
      name,
      description,
      createdBy: userId,
      members: [userId] // Add the creator as a member
    });

    setName('');
    setDescription('');
    // Optionally, refresh the project list or redirect
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Project Name" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Project Description" required />
      <button type="submit">Create Project</button>
    </form>
  );
};

export default ProjectForm;
