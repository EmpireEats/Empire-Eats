import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from '../../redux/actions/restaurantActions';
import Map from './Map';
import List from './List';

const WeOutside = () => {
  const dispatch = useDispatch();
  const { allRestaurants } = useSelector(state => state.restaurant);
  const [isMapsLoaded, setIsMapsLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchRestaurants());
    const apiKey = 'AIzaSyB8WHeAkLekUORmNa6_J30MwviZqj6qMM8';
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.onload = () => setIsMapsLoaded(true);
    document.body.appendChild(script);
  }, [dispatch]);

  return (
    <div>
      {isMapsLoaded && <Map restaurants={allRestaurants} />}
      <List restaurants={allRestaurants} />
    </div>
  );
};

export default WeOutside;