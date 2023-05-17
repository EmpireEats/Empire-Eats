import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from '../../redux/actions/restaurantActions';
import AllRestaurants from './AllRestaurants';
import Map from './Map';

const WeOutside = () => {
  const dispatch = useDispatch();
  const { allRestaurants } = useSelector(state => state.restaurant);
  const [selectedRestaurantLocation, setSelectedRestaurantLocation] = useState(null);


  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  return (
    <div>
      <Map selectedRestaurantLocation={selectedRestaurantLocation} />
      <AllRestaurants
        restaurants={allRestaurants}
        setSelectedRestaurantLocation={setSelectedRestaurantLocation}
      />
    </div>
  );
};

export default WeOutside;