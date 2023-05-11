import React, { useRef, useEffect } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRestaurantsInBounds } from '../../redux/actions/restaurantActions';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const Map = () => {
  const dispatch = useDispatch();
  const nycBounds = useSelector((state) => state.restaurant.nycBounds);
  const mapRef = useRef();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyB8WHeAkLekUORmNa6_J30MwviZqj6qMM8',
  });

  const onMapLoad = (map) => {
    mapRef.current = map;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        map.setCenter(userLocation);
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  };

  useEffect(() => {
    if (mapRef.current) {
      const bounds = mapRef.current.getBounds();
      dispatch(fetchRestaurantsInBounds(bounds));
    }
  }, [dispatch, mapRef]);

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={{ lat: 40.7128, lng: -74.0060 }} // Set the initial center to New York City
      zoom={15}
      onLoad={onMapLoad}
      onBoundsChanged={() => {
        if (mapRef.current) {
          const bounds = mapRef.current.getBounds();
          dispatch(fetchRestaurantsInBounds(bounds));
        }
      }}
    />
  ) : (
    <></>
  );
};

export default Map;
