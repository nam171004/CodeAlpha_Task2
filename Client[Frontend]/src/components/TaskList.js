import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import TaskForm from './TaskForm';

const socket = io('http://localhost:5000');

const TaskList = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get(`http://localhost:5000/api/tasks?projectId=${projectId}`);
      setTasks(response.data);
    };
    fetchTasks();

    socket.on('taskCreated', (task) => {
      setTasks((prevTasks) => [...prevTasks, task]);
    });

    return () => {
      socket.off('taskCreated');
    };
  }, [projectId]);

  return (
    <div>
      <h3>Tasks</h3>
      <TaskForm projectId={projectId} />
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}
            {/* Add functionality to comment on tasks */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
