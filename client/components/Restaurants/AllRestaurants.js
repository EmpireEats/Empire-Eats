import React from 'react';
import { useSelector } from 'react-redux';
import RestaurantDetails from './RestaurantDetails';
import '../../../public/styles/weOutside.css';

const AllRestaurants = () => {
  const allRestaurants = useSelector(state => state.restaurant.allRestaurants);

  return (
    <div className="list-container">
      {allRestaurants.map((restaurant, index) => (
        <RestaurantDetails key={restaurant.placeId} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default AllRestaurants;