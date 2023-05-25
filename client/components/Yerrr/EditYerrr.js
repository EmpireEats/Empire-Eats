import React, { useState } from 'react';
import { useSocket } from '../../contexts/SocketContext';
import Button from '@mui/material/Button';

const EditYerrr = ({ post, onSave, onCancel }) => {
  const [updatedPost, setUpdatedPost] = useState(post);
  const socket = useSocket();

  const handleUpdatePreference = (event) => {
    setUpdatedPost({ ...updatedPost, preference: event.target.value });
  };

  const handleSave = () => {
    if (socket) {
      socket.emit('updatePost', updatedPost);
    }
    onSave();
  };

  return (
    <div>
      <div>
        <p>{updatedPost.user.firstName}</p>
      </div>
      <div>
        <span>Message: </span>
        <input
          placeholder='message'
          value={updatedPost.message}
          onChange={(e) =>
            setUpdatedPost({ ...updatedPost, message: e.target.value })
          }
        />
      </div>
      <div>
        <span>Preference: </span>
        <select
          value={updatedPost.preference}
          onChange={handleUpdatePreference}>
          <option value='one on one'>1 on 1</option>
          <option value='group'>Group</option>
          <option value='no preference'>No preference</option>
        </select>
      </div>
      <Button
        variant='contained'
        sx={{ backgroundColor: '#9C94B1' }}
        onClick={handleSave}>
        Save
      </Button>
      <Button
        variant='outlined'
        sx={{ borderColor: '#9C94B1' }}
        onClick={onCancel}>
        Cancel
      </Button>
    </div>
  );
};

export default EditYerrr;
