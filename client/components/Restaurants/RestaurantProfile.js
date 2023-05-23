import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleRestaurant } from '../../redux/actions/restaurantActions';
import ReviewForm from '../Reviews/ReviewForm'
import ReviewsForRestaurant from '../Reviews/ReviewsForRestaurant'
import Modal from 'react-modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import { Grid } from '@mui/material';

Modal.setAppElement('#root');

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

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
    <Grid container direction="column" alignItems="center" justifyContent="center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', paddingTop: '80px', paddingBottom: '80px', maxWidth: '90%', margin: '0 auto' }}>
      <Grid item xs={12} style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <Typography variant='h4' align='center'>{restaurant.name}</Typography>
      </Grid>

      <Grid item xs={12} style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '20px', paddingBottom: '20px' }}>
        <Typography variant='subtitle1' align='center' style={{ fontWeight: 'bold' }}>Contact Information:</Typography>
        {restaurant.formattedPhoneNumber && (
          <Typography align='center'><span style={{ fontWeight: 'bold' }}>Phone: </span> {restaurant.formattedPhoneNumber}</Typography>
        )}
        <Typography align='center'><span style={{ fontWeight: 'bold' }}>Address: </span>{restaurant.address}</Typography>
      </Grid>

      <Grid item xs={12} style={{ paddingLeft: '20px', paddingRight: '20px', paddingBottom: '20px' }}>
        <Typography variant='subtitle1' align='center' style={{ fontWeight: 'bold' }}>Hours of Operation:</Typography>
        {restaurant.openingHours && restaurant.openingHours.weekday_text.length > 0 ? (
          restaurant.openingHours.weekday_text.map((day, index) => (
            <Typography key={index} align='center'>{day}</Typography>
          ))
        ) : (
          <Typography align='center'>No hours available</Typography>
        )}
      </Grid>

      <Grid item xs={12}>
        <Button variant='contained' style={{ backgroundColor: '#9C94B1', margin: '20px' }} onClick={handleReviewButtonClick}>
          Leave a review
        </Button>
      </Grid>
      
      {showReviewForm && (
        <ReviewForm placeId={placeId} restaurantName={restaurant.name} restaurantAddress={restaurant.address} />
      )}
      
      <Grid item xs={12} style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <ReviewsForRestaurant key={placeId} placeId={placeId} />
      </Grid>
      
      <Modal
        className='weOutside-modal'
        overlayClassName="weOutside-modal-overlay"
        isOpen={showLoginModal}
        onRequestClose={closeModal}
        contentLabel="Login Modal"
      >
        <h2>Join the race to be NYC's #1 foodie!</h2>
        <p>If you want to leave a review, you need to <StyledLink to="/login">Login</StyledLink> or <StyledLink to="/signup">Signup</StyledLink>.</p>
      </Modal>
    </Grid>
  );
};

export default RestaurantProfile;