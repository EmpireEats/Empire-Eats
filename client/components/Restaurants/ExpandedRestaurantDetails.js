import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleRestaurant } from '../../redux/actions/restaurantActions';
import ReviewForm from '../Reviews/ReviewForm';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import '../../../public/styles/weOutside.css';
import { fetchReviewsByPlaceAsync } from '../../redux/actions/reviewActions';

Modal.setAppElement('#root');

const ExpandedRestaurantDetails = ({ restaurant, expanded, onRestaurantClick }) => {
  const singleRestaurant = useSelector(state => state.restaurant.singleRestaurant);
  const loggedInUser = useSelector(state => state.auth.user);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const totalReviewsCount = useSelector(state => state.review.totalReviewsCount);

  const dispatch = useDispatch();

  useEffect(() => {
    if (expanded) {
      dispatch(fetchReviewsByPlaceAsync({ placeId: restaurant.placeId, page: 1 }));
    }
  }, [expanded, dispatch, restaurant.placeId]);

  const handleClick = () => {
    onRestaurantClick(restaurant.placeId);
    if (!expanded) {
      dispatch(fetchSingleRestaurant(restaurant.placeId));
    }
  };

  const handleReviewButtonClick = (event) => {
    event.stopPropagation();
    if (loggedInUser) {
      setShowReviewForm(!showReviewForm); 
    } else {
      setShowLoginModal(true);
    }
  };

  const closeModal = () => {
    setShowLoginModal(false);
  };

  return (
    <div onClick={handleClick} className="restaurant-item">
      <h3>{restaurant.name}</h3>
      <p style={{ fontWeight: 'bold' }}>{restaurant.address}</p>
      {expanded && singleRestaurant && (
        <div>
          {singleRestaurant.formattedPhoneNumber && (
            <p><span style={{ fontWeight: 'bold' }}>Phone:</span> {singleRestaurant.formattedPhoneNumber}</p>
          )}
          {singleRestaurant.openingHours && (
            <div className='ooo'>
              <h4>Opening Hours:</h4>
              {singleRestaurant.openingHours.weekday_text.map((day, index) => (
                <p key={index}>{day}</p>
              ))}
            </div>
          )}
          {expanded && (
            <>
              {totalReviewsCount > 0 ? (
                <p className="reviews-text">This restaurant has {totalReviewsCount} reviews.</p>
              ) : (
                <p className="reviews-text">No reviews on this restaurant yet.</p>
              )}
              <Link to={`/restaurants/${restaurant.placeId}`} className="view-restaurant-link">
                View Restaurant Profile
              </Link>
            </>
          )}
          <button onClick={handleReviewButtonClick}>Leave a review</button>
          {showReviewForm && (
            <ReviewForm placeId={restaurant.placeId} restaurantName={restaurant.name} restaurantAddress={restaurant.address} />
          )}
        </div>
      )}
      <Modal
        className='weOutside-modal'
        overlayClassName="weOutside-modal-overlay"
        isOpen={showLoginModal}
        onRequestClose={closeModal}
        contentLabel="Login Modal"
      >
        <div className='weOutside-modal-content'>
          <h2>Join the race to be NYC's #1 foodie!</h2>
          <p>If you want to leave a review, you need to <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link>.</p>
        </div>
      </Modal>
    </div>
  );
};

export default ExpandedRestaurantDetails;