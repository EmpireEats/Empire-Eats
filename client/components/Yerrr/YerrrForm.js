import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPostAsync } from '../../redux/actions/postActions';
import { useNavigate } from 'react-router';
import { useSocket } from '../../contexts/SocketContext';

const YerrrForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = useSocket();
  const user = useSelector((state) => state.auth.user);
  const [formState, setFormState] = useState({
    text: '',
    sortingOptions: 'one on one',
  });
  console.log('user:', user);

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

      // await dispatch(addPostAsync({ text, sortingOptions }));

      if (socket) {
        socket.emit('newPost', {
          text,
          preferences: sortingOptions,
          isActive: true,
          userId: user.id,
        });
      }

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
