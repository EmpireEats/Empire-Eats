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

const Map = ({ restaurants }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB8WHeAkLekUORmNa6_J30MwviZqj6qMM8&callback=initMap';
    document.head.appendChild(script);
    script.onload = () => setIsLoaded(true);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (isLoaded) {
      getGeolocation()
        .then(({ latitude, longitude }) => {
          const center = { lat: latitude, lng: longitude };
          const options = {
            center,
            restriction: {
              latLngBounds: NYC_BOUNDS,
              strictBounds: true,
            },
            zoom: 14,
          };
          map = new window.google.maps.Map(document.getElementById('map'), options);
        })
        .catch(error => {
          console.error(error);
          const options = {
            center: DEFAULT_CENTER,
            restriction: {
              latLngBounds: NYC_BOUNDS,
              strictBounds: true,
            },
            zoom: 14,
          };
          map = new window.google.maps.Map(document.getElementById('map'), options);
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