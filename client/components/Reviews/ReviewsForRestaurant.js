import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviewsByPlaceAsync } from '../../redux/actions/reviewActions';
import { clearReviews } from '../../redux/reducers/reviewReducer';
import { Box, Typography, Grid, Button } from '@mui/material';

const ReviewsForRestaurant = ({ placeId }) => {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.review.allReviews);
  const totalReviewsCount = useSelector(state => state.review.totalReviewsCount);
  const status = useSelector(state => state.review.status);
  const loggedInUser = useSelector(state => state.auth.user);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchReviewsByPlaceAsync({ placeId, page }));
  }, [dispatch, placeId, page]);

  useEffect(() => {
    return () => {
      dispatch(clearReviews());
    };
  }, [dispatch]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString();
  // };

  return (
    <Box>
      <Typography variant="h5" paragraph>Reviews:</Typography>
      <Grid container sx={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', // Set the minimum width to be larger
        gridGap: '16px',
        '@media (min-width: 900px)': {
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', // Set the minimum width to be larger
          gridGap: '8px',
        },
      }}>
        {status === 'loading' ? (
          <Typography>Loading reviews...</Typography>
        ) : loggedInUser ? (
          reviews.length > 0 ? 
            reviews.map((review, index) => (
              <Grid item sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginBottom: 2 
              }} key={index}>
                {review.image && (
                  <Box 
                    component="img"
                    src={review.image}
                    alt="Review" 
                    sx={{ 
                      width: '100%', 
                      height: 'auto',
                      maxHeight: '200px',
                      objectFit: 'cover',
                      marginBottom: '8px',
                      '@media (min-width: 900px)': {
                        maxHeight: '350px',
                      }
                    }}
                  />
                )}
                <Typography variant="body1">"{review.body}"</Typography>
                <Typography variant="caption">
                  {new Date(review.createdAt).toLocaleDateString()}
                </Typography>
              </Grid>
            ))
            : <Typography sx={{ fontStyle: 'italic' }}>There are no reviews for this restaurant.</Typography>
        ) : (
          <Typography>You need to be logged in to see reviews.</Typography>
        )}
      </Grid>
      {loggedInUser && reviews.length < totalReviewsCount && status !== 'loading' && (
        <Button onClick={handleLoadMore}>
          Load More
        </Button>
      )}
    </Box>
  );
};

export default ReviewsForRestaurant;