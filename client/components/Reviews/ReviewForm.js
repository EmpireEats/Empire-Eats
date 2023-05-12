import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addReviewAsync } from '../../redux/actions/reviewActions';

const ReviewForm = ({ placeId, restaurantName, restaurantAddress }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [body, setBody] = useState('');

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    dispatch(addReviewAsync({ placeId, name: restaurantName, address: restaurantAddress, body }))
      .then (() => {
        navigate('/');
        setBody('');
      })
  };

  const handleClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div onClick={handleClick}>
      <h2>Add a review</h2>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="placeId" value={placeId} />
        <br />
        <input type="hidden" name="restaurantName" value={restaurantName} />
        <br />
        <input type="hidden" name="restaurantAddress" value={restaurantAddress} />
        <br />
        <label htmlFor="body">Review:</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReviewForm;