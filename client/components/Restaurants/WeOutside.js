import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from '../../redux/actions/restaurantActions';
import Map from './Map';
import List from './List';

const WeOutside = () => {
  const dispatch = useDispatch();
  const { allRestaurants } = useSelector(state => state.restaurant);
  const [userLocation, setUserLocation] = useState({});

  useEffect(() => {
    dispatch(fetchRestaurants());
    navigator.geolocation.getCurrentPosition(
      position => setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude }),
      error => console.error(error)
    );
  }, [dispatch]);

  return (
    <div>
      <Map userLocation={userLocation} restaurants={allRestaurants} />
      <List restaurants={allRestaurants} />
    </div>
  );
};

export default WeOutside;