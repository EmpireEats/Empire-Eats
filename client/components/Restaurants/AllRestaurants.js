import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RestaurantDetails from './RestaurantDetails';
import { fetchRestaurants } from '../../redux/actions/restaurantActions';
import '../../../public/styles/weOutside.css';

const AllRestaurants = ({ restaurants, setSelectedRestaurantLocation }) => {
  const status = useSelector(state => state.restaurant.status);
  const error = useSelector(state => state.restaurant.error);
  const nextPageToken = useSelector(state => state.restaurant.nextPageToken);
  const dispatch = useDispatch();
  const [expandedPlaceId, setExpandedPlaceId] = useState(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleRestaurantClick = (placeId) => {
    const selectedRestaurant = restaurants.find(
      (restaurant) => restaurant.placeId === placeId
    );
    setSelectedRestaurantLocation(selectedRestaurant.location);
    setExpandedPlaceId((prevPlaceId) =>
      prevPlaceId === placeId ? null : placeId
    );
  };  

  const handleLoadMore = () => {
    if (nextPageToken && !isLoadingMore) {
      setIsLoadingMore(true);
      dispatch(fetchRestaurants())
        .finally(() => {
          setIsLoadingMore(false);
        });
    }
  };

  if (status === 'loading' && restaurants.length === 0) {
    return <div className="loading-message">We're finding restaurants near you...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        Sorry, you need to be in NYC to join the foodie race!
      </div>
    );
  }

  return (
    <div className="list-container">
      {restaurants.map((restaurant, index) => (
        <RestaurantDetails
          key={restaurant.placeId}
          restaurant={restaurant}
          expanded={expandedPlaceId === restaurant.placeId}
          onRestaurantClick={handleRestaurantClick}
        />
      ))}
      {nextPageToken && !isLoadingMore && (
        <button onClick={handleLoadMore} className="load-more-button">
          Load more results
        </button>
      )}
      {isLoadingMore && (
        <div className="loading-more-message">Loading more restaurants...</div>
      )}
    </div>
  );
};

export default AllRestaurants;