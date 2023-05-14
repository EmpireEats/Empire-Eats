import React from 'react';
import { useSelector } from 'react-redux';
import RestaurantDetails from './RestaurantDetails';
import '../../../public/styles/weOutside.css';

const AllRestaurants = () => {
  const allRestaurants = useSelector(state => state.restaurant.allRestaurants);
  const status = useSelector(state => state.restaurant.status);
  const error = useSelector(state => state.restaurant.error);

  if (status === 'loading') {
    return <div className="loading-message">We're finding restaurants near you...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        Sorry, you need to be in NYC to join the foodie race!
      </div>
    );
  }

  return (
    <div className="list-container">
      {allRestaurants.map((restaurant, index) => (
        <RestaurantDetails key={restaurant.placeId} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default AllRestaurants;