import React, { useState } from 'react';
import { useSocket } from '../../contexts/SocketContext';

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
        <p>
          <span>{updatedPost.user.image}</span>
          {updatedPost.user.firstName}
        </p>
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
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditYerrr;
