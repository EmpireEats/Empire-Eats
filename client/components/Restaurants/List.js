import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleRestaurant } from '../../redux/actions/restaurantActions';
import ReviewForm from '../Reviews/ReviewForm';

const List = ({ map }) => {
  const dispatch = useDispatch();
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const allRestaurants = useSelector(state => state.restaurant.allRestaurants);
  const singleRestaurant = useSelector(state => state.restaurant.singleRestaurant);
  const loggedInUser = useSelector(state => state.auth.user);

  const handleClick = async (restaurant) => {
    setSelectedRestaurantId(restaurant.placeId);
    setShowReviewForm(false);
    await dispatch(fetchSingleRestaurant(restaurant.placeId));
  };

  const handleReviewButtonClick = (event) => {
    event.stopPropagation();
    if (loggedInUser) {
      setShowReviewForm(!showReviewForm);
    } else {
      alert('Please login or signup to leave a review.');
    }
  };

  return (
    <div style={{ height: '300px', overflowY: 'scroll' }}>
      {allRestaurants.map((restaurant, index) => (
        <div key={`${restaurant.placeId}-${index}`} onClick={() => handleClick(restaurant)}>
          <h3>{restaurant.name}</h3>
          <p>{restaurant.address}</p>
          {selectedRestaurantId === restaurant.placeId && (
            <div>
              {singleRestaurant.formattedPhoneNumber && (
                <p>Phone: {singleRestaurant.formattedPhoneNumber}</p>
              )}
              {singleRestaurant.openingHours && (
                <p>Opening Hours: {singleRestaurant.openingHours.weekday_text.join(', ')}</p>
              )}
              {singleRestaurant.website && (
                <p>Website: <a href={singleRestaurant.website} target="_blank">{singleRestaurant.website}</a></p>
              )}
              <button onClick={handleReviewButtonClick}>Review</button>
              {showReviewForm && (
                <ReviewForm placeId={selectedRestaurantId} restaurantName={restaurant.name} restaurantAddress={restaurant.address}/>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default List;