import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import ProjectForm from './ProjectForm';

const socket = io('http://localhost:5000');

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await axios.get('http://localhost:5000/api/projects');
      setProjects(response.data);
    };
    fetchProjects();

    socket.on('projectCreated', (project) => {
      setProjects((prevProjects) => [...prevProjects, project]);
    });

    return () => {
      socket.off('projectCreated');
    };
  }, []);

  return (
    <div>
      <h2>Projects</h2>
      <ProjectForm />
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            {project.name}
            {/* Add a button to view tasks for this project */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
