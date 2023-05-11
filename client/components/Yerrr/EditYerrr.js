import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSocket } from '../../contexts/SocketContext';

const EditYerrr = ({ post, onSave, onCancel }) => {
  const [updatedPost, setUpdatedPost] = useState(post);
  const dispatch = useDispatch();
  const socket = useSocket();

  const handleUpdatePreference = (event) => {
    setUpdatedPost({ ...updatedPost, preference: event.target.value });
    console.log('updated post in component:', updatedPost);
  };

  const handleSave = () => {
    console.log('updated post before dispatch', updatedPost);
    if (socket) {
      socket.emit('updatePost', updatedPost);
    }
    onSave();
  };

  return (
    <div>
      <select value={updatedPost.preference} onChange={handleUpdatePreference}>
        <option value='one on one'>1 on 1</option>
        <option value='group'>Group</option>
        <option value='no preference'>No preference</option>
      </select>
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditYerrr;
