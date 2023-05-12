import React from 'react';
import '../../../public/styles/weOutside.css'; // Import the CSS file for the List component

const List = ({ restaurants }) => {
  return (
    <div className="list-container">
      {restaurants.map(restaurant => (
        <div key={restaurant.placeId} className="restaurant-item">
          <h3>{restaurant.name}</h3>
          <p>{restaurant.address}</p>
        </div>
      ))}
    </div>
  );
};

//add the ability to expand each restaurant. should i do it here or a new component?
//new component so i can add review button & more info for each restaurant?

export default List;
