import React, { useEffect, useRef } from 'react';
import { getGeolocation } from '../../redux/actions/restaurantActions';

const NewMap = () => {
  const mapRef = useRef(null);
  let map;

  useEffect(() => {
    const loadMap = async () => {
      await loadGoogleMaps();
      initMap();
    };

    const loadGoogleMaps = async () => {
      if (window.google && window.google.maps) {
        return;
      }

      await new Promise((resolve) => {
        window.initMap = resolve;
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB8WHeAkLekUORmNa6_J30MwviZqj6qMM8&libraries=places&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      });
    };

    const initMap = async () => {
      const nycBounds = {
        south: 40.477399,
        west: -74.259090,
        north: 40.917577,
        east: -73.700272
      };

      try {
        const { latitude, longitude } = await getGeolocation();
        const userLocation = { lat: latitude, lng: longitude };

        map = new window.google.maps.Map(mapRef.current, {
          center: userLocation,
          zoom: 14,
          restriction: {
            latLngBounds: nycBounds,
            strictBounds: true
          }
        });

        addUserMarker(userLocation);
      } catch (error) {
        console.error('Error getting user location:', error);
      }
    };

    const addUserMarker = (userLocation) => {
      new window.google.maps.Marker({
        position: userLocation,
        map,
        title: 'Your Location'
      });
    };

    loadMap();
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>;
};

export default NewMap;