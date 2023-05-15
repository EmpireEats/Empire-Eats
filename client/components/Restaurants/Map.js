import React, { useEffect, useState } from 'react';
import { getGeolocation } from '../../redux/actions/restaurantActions';

let map;
const NYC_BOUNDS = {
  north: 40.917577,
  south: 40.477399,
  west: -74.25909,
  east: -73.700181,
};
const DEFAULT_CENTER = { lat: 40.712776, lng: -74.005974 };

const Map = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB8WHeAkLekUORmNa6_J30MwviZqj6qMM8&callback=initMap`;
    document.head.appendChild(script);
    script.onload = () => setIsLoaded(true);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const createMapInstance = (center) => {
      const options = {
        center,
        restriction: {
          latLngBounds: NYC_BOUNDS,
          strictBounds: true,
        },
        zoom: 14,
      };
      map = new window.google.maps.Map(document.getElementById('map'), options);
    };

    if (isLoaded) {
      getGeolocation()
        .then(({ latitude, longitude }) => {
          const center = { lat: latitude, lng: longitude };
          createMapInstance(center);
        })
        .catch(error => {
          console.error(error);
          createMapInstance(DEFAULT_CENTER);
        });
    }
  }, [isLoaded]);

  return (
    <div>
      <div id="map" style={{ height: '300px', width: '100%' }} />
    </div>
  );
};

export default Map;