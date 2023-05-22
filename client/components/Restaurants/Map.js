import React, { useEffect, useRef, useState } from 'react';
import { getGeolocation } from '../../redux/actions/restaurantActions';

const Map = ({ selectedRestaurantLocation }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [userMarker, setUserMarker] = useState(null);

  const defaultCenter = { lat: 40.7128, lng: -74.0060 };

  useEffect(() => {
    const loadMap = async () => {
      await loadGoogleMaps();
      initMap();
    };

    loadMap();
  }, []);

  useEffect(() => {
    if (selectedRestaurantLocation && map) {
      getGeolocation()
        .then(({ latitude, longitude }) => {
          const userLocation = { lat: latitude, lng: longitude };
          updateUserMarker(userLocation);
          calculateAndDisplayRoute(userLocation, selectedRestaurantLocation);
        })
        .catch(() => {
          updateUserMarker(defaultCenter);
          calculateAndDisplayRoute(defaultCenter, selectedRestaurantLocation);
        });
    }
  }, [selectedRestaurantLocation, map]);

  useEffect(() => {
    if (map) {
      getGeolocation()
        .then(({ latitude, longitude }) => {
          const userLocation = { lat: latitude, lng: longitude };
          if (userLocation) {
            updateUserMarker(userLocation);
          } else {
            updateUserMarker(defaultCenter);
          }
        })
        .catch(() => {
          updateUserMarker(defaultCenter);
        });
    }
  }, [map]);

  const loadGoogleMaps = async () => {
    if (window.google && window.google.maps) {
      return;
    }

    await new Promise((resolve) => {
      window.initMap = resolve;
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyATGRgJ8jvgnhjoDTvJyXy8TnepsBrsSJk&libraries=places&callback=initMap`;
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
  
    let userLocation;
  
    try {
      const { latitude, longitude } = await getGeolocation();
      userLocation = { lat: latitude, lng: longitude };
    } catch (error) {
      userLocation = defaultCenter;
    }
  
    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: userLocation,
      zoom: 16,
      restriction: {
        latLngBounds: nycBounds,
        strictBounds: true
      }
    });
  
    const directionsRendererInstance = new google.maps.DirectionsRenderer();
    directionsRendererInstance.setMap(mapInstance);
    setDirectionsRenderer(directionsRendererInstance);
  
    setMap(mapInstance);
  };  

  const updateUserMarker = (userLocation) => {
    if (userMarker) {
      userMarker.setPosition(userLocation);
    } else {
      const newUserMarker = new window.google.maps.Marker({
        position: userLocation,
        map,
        animation: google.maps.Animation.DROP,
        title: 'Your Location'
      });
      setUserMarker(newUserMarker);
    }
  };

  const calculateAndDisplayRoute = (userLocation, destination) => {
    const directionsService = new google.maps.DirectionsService();

    directionsService
      .route({
        origin: userLocation,
        destination: destination,
        travelMode: google.maps.TravelMode.WALKING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      });
  };

  return (
    <div ref={mapRef} className='map-container'></div>
  );
};

export default Map;