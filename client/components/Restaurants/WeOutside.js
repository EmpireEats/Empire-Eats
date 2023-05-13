import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from '../../redux/actions/restaurantActions';
import Map from './Map';
import AllRestaurants from './AllRestaurants';

const WeOutside = () => {
  const dispatch = useDispatch();
  const { allRestaurants } = useSelector(state => state.restaurant);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  return (
    <div>
      <Map restaurants={allRestaurants} />
      <AllRestaurants restaurants={allRestaurants} />
    </div>
  );
};

export default WeOutside;