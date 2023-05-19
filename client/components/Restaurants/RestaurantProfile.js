import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleRestaurant } from '../../redux/actions/restaurantActions';
import ReviewForm from '../Reviews/ReviewForm'
import ReviewsForRestaurant from '../Reviews/ReviewsForRestaurant'
import Modal from 'react-modal';
import '../../../public/styles/weOutside.css'

Modal.setAppElement('#root');

const RestaurantProfile = () => {
  const restaurant = useSelector(state => state.restaurant.singleRestaurant);
  const loggedInUser = useSelector(state => state.auth.user);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const dispatch = useDispatch();
  const { placeId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleRestaurant(placeId));
  }, [dispatch, placeId]);

  const handleReviewButtonClick = () => {
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
    <div className="restaurant-profile">
      <h1 className="restaurant-name">{restaurant.name}</h1>
      <div className="restaurant-details">
        <div className="restaurant-hours">
            <h3>Hours of Operation:</h3>
            {restaurant.openingHours && restaurant.openingHours.weekday_text.length > 0 ? (
              <div>
                {restaurant.openingHours.weekday_text.map((day, index) => (
                  <p key={index}>{day}</p>
                ))}
              </div>
            ) : (
              <p>No hours available</p>
            )}
          </div>
          <div className="restaurant-info">
            <h3>Contact Information:</h3>
            {restaurant.formattedPhoneNumber && (
              <p><span style={{ fontWeight: 'bold' }}>Phone: </span> {restaurant.formattedPhoneNumber}</p>
            )}
            <p><span style={{ fontWeight: 'bold' }}>Address: </span>{restaurant.address}</p>
            <button className='review-button' onClick={handleReviewButtonClick}>Leave a review</button>
            {showReviewForm && (
              <ReviewForm placeId={placeId} restaurantName={restaurant.name} restaurantAddress={restaurant.address} />
            )}
          </div>
        </div>
      <ReviewsForRestaurant key={placeId} placeId={placeId} />
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

export default RestaurantProfile;