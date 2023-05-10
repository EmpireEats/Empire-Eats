import React, { useEffect, useState } from 'react';

const Map = ({ restaurants }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [map, setMap] = useState(null);

  useEffect(() => {
    // const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB8WHeAkLekUORmNa6_J30MwviZqj6qMM8';
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);
  }, []);

  const initMap = async () => {
    const { Map } = await window.google.maps.importLibrary('maps');
    const mapElement = document.getElementById('map');
    const options = {
      center: { lat: 40.712776, lng: -74.005974 }, // Default to NYC
      zoom: 12,
    };
    const newMap = new Map(mapElement, options);
    setMap(newMap);
  };

  useEffect(() => {
    if (isLoaded) {
      initMap();
    }
  }, [isLoaded]);

  return (
    <div>
      <div id="map" style={{ height: '500px', width: '100%' }} />
    </div>
  );
};

export default Map;