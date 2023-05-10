import React, { useEffect, useRef } from 'react';

const Map = ({ restaurants, position }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!position || isNaN(position.lat) || isNaN(position.lng)) {
      console.error('Invalid position data:', position);
      return;
    }

    const mapOptions = {
      center: { lat: position.lat, lng: position.lng },
      zoom: 14,
    };

    const map = new window.google.maps.Map(mapRef.current, mapOptions);

    // Add markers for each restaurant
    restaurants.forEach((restaurant) => {
      const marker = new window.google.maps.Marker({
        position: { lat: restaurant.lat, lng: restaurant.lng },
        map,
        title: restaurant.name,
      });

      marker.addListener('click', () => {
        // Open the info window when the marker is clicked
        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div><strong>${restaurant.name}</strong><br>${restaurant.address}<br><a href="/restaurants/${restaurant.placeId}">More info</a></div>`,
        });
        infoWindow.open(map, marker);
      });
    });
  }, [restaurants, position]);

  return <div className="map" ref={mapRef}></div>;
};

export default Map;