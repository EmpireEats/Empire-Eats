import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from '../../redux/actions/restaurantActions';
import Map from './Map';
import AllRestaurants from './AllRestaurants';
import NewMap from './NewMap';

const WeOutside = () => {
  const dispatch = useDispatch();
  const { allRestaurants } = useSelector(state => state.restaurant);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  return (
    <div>
      <h1>We Outside</h1>
      <NewMap />
      <AllRestaurants restaurants={allRestaurants} />
    </div>
  );
};

export default WeOutside;