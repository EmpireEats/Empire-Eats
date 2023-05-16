import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from '../../redux/actions/restaurantActions';
import AllRestaurants from './AllRestaurants';
import NewMap from './NewMap';

const WeOutside = () => {
  const dispatch = useDispatch();
  const { allRestaurants } = useSelector(state => state.restaurant);
  const [selectedRestaurantLocation, setSelectedRestaurantLocation] = useState(null);


  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  return (
    <div>
      <h1>We Outside</h1>
      <NewMap selectedRestaurantLocation={selectedRestaurantLocation} />
      <AllRestaurants
        restaurants={allRestaurants}
        setSelectedRestaurantLocation={setSelectedRestaurantLocation}
      />
    </div>
  );
};

export default WeOutside;