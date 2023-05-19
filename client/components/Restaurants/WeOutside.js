import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from '../../redux/actions/restaurantActions';
import AllRestaurants from './AllRestaurants';
import Map from './Map';
import '../../../public/styles/weOutside.css'

const WeOutside = () => {
  const dispatch = useDispatch();
  const { allRestaurants } = useSelector(state => state.restaurant);
  const [selectedRestaurantLocation, setSelectedRestaurantLocation] = useState(null);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  return (
    <div className='weOutside-component-container'>
      <h1>wussup baby, take me out to dinner...</h1>
      <Map selectedRestaurantLocation={selectedRestaurantLocation} />
      <AllRestaurants
        restaurants={allRestaurants}
        setSelectedRestaurantLocation={setSelectedRestaurantLocation}
      />
    </div>
  );
};

export default WeOutside;