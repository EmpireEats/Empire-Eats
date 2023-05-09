import React, { useState, useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import { LoadScript } from '@react-google-maps/api';

const Map = () => {
  const [center, setCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const mapRef = useRef();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCenter({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_MAPS_API_KEY}
    >
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          center={center}
          defaultZoom={11}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => {
            mapRef.current = { map, maps };
          }}
        >
          {/* Render markers or other map components */}
        </GoogleMapReact>
      </div>
    </LoadScript>
  );  
};

export default Map;