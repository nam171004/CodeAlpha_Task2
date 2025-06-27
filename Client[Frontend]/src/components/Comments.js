import React, { useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const Comment = ({ taskId }) => {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userId = JSON.parse(atob(token.split('.')[1])).id; // Decode token to get user ID

    await axios.post(`http://localhost:5000/api/tasks/${taskId}/comments`, { user: userId, text: comment });
    setComment('');
  };

  return (
    <form onSubmit={handleCommentSubmit}>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment"
        required
      />
      <button type="submit">Comment</button>
    </form>
  );
};

export default Comment;
