import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleRestaurant } from '../../redux/actions/restaurantActions';
import ReviewForm from '../Reviews/ReviewForm';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import '../../../public/styles/weOutside.css';

Modal.setAppElement('#root');

const RestaurantDetails = ({ restaurant, expanded, onRestaurantClick }) => {
  const dispatch = useDispatch();
  const singleRestaurant = useSelector(state => state.restaurant.singleRestaurant);
  const loggedInUser = useSelector(state => state.auth.user);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

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
      <p>{restaurant.address}</p>
      {expanded && singleRestaurant && (
        <div>
          {singleRestaurant.formattedPhoneNumber && (
            <p>Phone: {singleRestaurant.formattedPhoneNumber}</p>
          )}
          {singleRestaurant.openingHours && (
            <div>
              <p>Opening Hours:</p>
              {singleRestaurant.openingHours.weekday_text.map((day, index) => (
                <p key={index}>{day}</p>
              ))}
            </div>
          )}
          {singleRestaurant.website && (
            <p>Website: <a href={singleRestaurant.website} target="_blank" rel="noreferrer">{singleRestaurant.website}</a></p>
          )}
          {expanded && (
            <Link to={`/reviews/${restaurant.placeId}`}>
              View Reviews
            </Link>
          )}
          <br/>
          <br/>
          <button onClick={handleReviewButtonClick}>Review</button>
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
          {/* <button onClick={closeModal}>Close</button> */}
        </div>
        
      </Modal>
    </div>
  );
};

export default RestaurantDetails;