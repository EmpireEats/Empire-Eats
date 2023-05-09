import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addPostAsync, addPost } from '../../redux/actions/postActions';
import { useNavigate } from 'react-router';
import io from 'socket.io-client';

const YerrrForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    text: '',
    sortingOptions: 'one on one',
  });

  const socketRef = useRef(null);

  useEffect(() => {
    if (!socketRef.current) {
      const newSocket = io('http://localhost:3000');
      socketRef.current = newSocket;
      console.log('Socket connection created:', newSocket);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const postData = async (event) => {
    event.preventDefault();
    const { text, sortingOptions } = formState;

    if (text.trim()) {
      console.log('Text:', text);
      console.log('Sorting Options:', sortingOptions);

      await dispatch(addPostAsync({ text, sortingOptions }));

      socketRef.current.emit('newPost', { text, sortingOptions });

      setFormState({
        text: '',
        sortingOptions: 'one on one',
      });

      navigate('/yerrr/now');
    } else {
      alert('Please enter a valid text.');
    }
  };

  return (
    <div>
      <form onSubmit={postData} method='POST'>
        <div>
          <label htmlFor='text'>
            <small>Text</small>
          </label>
          <input
            name='text'
            type='text'
            value={formState.text}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor='sortingOptions'>
            <small>Sorting Options</small>
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
