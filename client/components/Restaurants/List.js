import React from 'react';

const List = ({ restaurants, map }) => {
  const handleClick = restaurant => {
    if (map) {
      map.setCenter(restaurant.geometry.location);
      map.setZoom(15);
    }
  };

  return (
    <div style={{ height: '300px', overflowY: 'scroll' }}>
      {restaurants.map((restaurant, index) => (
        <div key={`${restaurant.place_id}-${index}`} onClick={() => handleClick(restaurant)}>
          <h3>{restaurant.name}</h3>
          <p>{restaurant.vicinity}</p>
          <button>Review</button>
        </div>
      ))}
    </div>
  );
};

export default List;