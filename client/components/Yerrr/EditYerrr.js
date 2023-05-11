import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const EditYerrr = ({ post, onSave, onCancel }) => {
  const [updatedPost, setUpdatedPost] = useState(post);
  const navigate = useNavigate();

  const handleFieldChange = (event) => {
    setUpdatedPost({
      ...updatedPost,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = () => {
    // Call your API to save the updated post
    onSave();
  };

  return (
    <div>
      <input
        type='text'
        name='preference'
        value={updatedPost.preference}
        onChange={handleFieldChange}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditYerrr;
