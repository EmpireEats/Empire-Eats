import React from 'react';
import { useSelector } from 'react-redux';
import Map from './Map';
import List from './List';

const WeOutside = () => {
  const { allRestaurants } = useSelector((state) => state.restaurant);

  return (
    <div>
      <Map />
      <List restaurants={allRestaurants} />
    </div>
  );
};

export default WeOutside;