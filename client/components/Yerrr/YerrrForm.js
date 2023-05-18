import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSocket } from '../../contexts/SocketContext';

const YerrrForm = ({ nowEnabled, yerrrEnabled, onChatEnabledChange }) => {
  const navigate = useNavigate();
  const socket = useSocket();
  const user = useSelector((state) => state.auth.user);

  const [formState, setFormState] = useState({
    message: '',
    sortingOptions: 'one on one',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const postData = async (event) => {
    event.preventDefault();
    const { message, sortingOptions } = formState;

    if (message.trim()) {
      console.log('Message:', message);
      console.log('Sorting Options:', sortingOptions);

      if (socket) {
        socket.emit('newPost', {
          message: message,
          preferences: sortingOptions,
          isActive: true,
          userId: user.id,
        });

        socket.once('newPost', (post) => {
          if (post) {
            onChatEnabledChange(true);
            yerrrEnabled(false);
            console.log('1. post id inside of socket:', post.id);
            navigate('/yerrr/chat', { state: { postId: post.id } });
          }
        });
      }

      setFormState({
        message: '',
        sortingOptions: 'one on one',
      });
    } else {
      alert('Please enter a valid message.');
    }
  };

  return (
    <div className='yerrrForm'>
      <form onSubmit={postData} method='POST'>
        <div>
          <label htmlFor='message'>
            <small>Message</small>
          </label>
          <input
            name='message'
            type='text'
            value={formState.message}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor='sortingOptions'>
            <small>Party: </small>
          </label>
          <select
            name='sortingOptions'
            value={formState.sortingOptions}
            onChange={handleInputChange}>
            <option value='one on one'>1 on 1</option>
            <option value='group'>Group</option>
            <option value='no preference'>No Preference</option>
          </select>
        </div>
        <button type='submit'>Post</button>
      </form>
    </div>
  );
};

export default YerrrForm;
