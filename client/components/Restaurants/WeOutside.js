import React, { useState, useEffect } from 'react';
import Map from './Map';
import RestaurantsList from './RestaurantsList';

const WeOutside = () => {
  return(
    <div>
      <Map />
      <RestaurantsList />
    </div>
  )
};

export default WeOutside;