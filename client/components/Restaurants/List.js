import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleRestaurant } from '../../redux/actions/restaurantActions';

const List = ({ map }) => {
  const dispatch = useDispatch();
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const allRestaurants = useSelector(state => state.restaurant.allRestaurants);
  const singleRestaurant = useSelector(state => state.restaurant.singleRestaurant);

  const handleClick = async (restaurant) => {
    if (map) {
      map.setCenter(restaurant.location);
      map.setZoom(15);
    }
    setSelectedRestaurantId(restaurant.placeId);
    await dispatch(fetchSingleRestaurant(restaurant.placeId));
  };

  const handleClose = () => {
    setSelectedRestaurantId(null);
  };

  return (
    <div style={{ height: '300px', overflowY: 'scroll' }}>
      {allRestaurants.map((restaurant, index) => (
        <div key={`${restaurant.placeId}-${index}`} onClick={() => handleClick(restaurant)}>
          <h3>{restaurant.name}</h3>
          <p>{restaurant.address}</p>
          {selectedRestaurantId === restaurant.placeId && (
            <div>
              <p>Address: {singleRestaurant.address}</p>
              {singleRestaurant.formattedPhoneNumber && (
                <p>Phone: {singleRestaurant.formattedPhoneNumber}</p>
              )}
              {singleRestaurant.openingHours && (
                <p>Opening Hours: {singleRestaurant.openingHours.weekday_text.join(', ')}</p>
              )}
              {singleRestaurant.website && (
                <p>Website: <a href={singleRestaurant.website} target="_blank">{singleRestaurant.website}</a></p>
              )}
              <button onClick={handleClose}>Close</button>
              <button>Review</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default List;
