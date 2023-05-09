import React, { useState, useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import { LoadScript } from '@react-google-maps/api';

const Map = () => {
  const [latitude, setLatitude] = useState(40.7128);
  const [longitude, setLongitude] = useState(-74.0060);
  const mapRef = useRef();

  const defaultProps = {
    center: { lat: latitude, lng: longitude },
    zoom: 11
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_MAPS_API_KEY}
      libraries={['places']}
    >
      <div style={{ height: "50vh", width: "100vh" }}>
        <GoogleMapReact
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => {
            mapRef.current = { map, maps };

            if (maps && maps.Geolocation) {
              const geolocation = maps.Geolocation;
              geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);
                map.setCenter(new maps.LatLng(latitude, longitude));
                // ...
              });
            }
          }}
        >
          {/* Render markers or other map components */}
        </GoogleMapReact>
      </div>
    </LoadScript>
  );  
};

export default Map;