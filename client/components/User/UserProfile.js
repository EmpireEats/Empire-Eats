import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleUser } from '../../redux/actions/authActions';
import { fetchLeaderboard } from '../../redux/actions/leaderboardActions';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import GridIcon from '@mui/icons-material/GridOn';
import SoloIcon from '@mui/icons-material/FilterNone';
import { styled } from '@mui/system';
import { deleteReviewByUserAsync } from '../../redux/actions/reviewActions';
import { ai } from '@cloudinary/url-gen/qualifiers/format';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const UserProfile = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = auth.user;
  const id = user?.id;
  const leaderboard = useSelector((state) => state.leaderboard.leaderboard);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleUser(id));
    }
    dispatch(fetchLeaderboard());
  }, [dispatch, id]);

  const { username, firstName, lastName, reviews } = user || {};

  const rank = leaderboard.findIndex((user) => user.name === username) + 1;
  const restaurantVisits = leaderboard.find(
    (user) => user.name === username
  )?.restaurantVisitCount;

  const [selectedReview, setSelectedReview] = useState(null);
  const [isGridLayout, setIsGridLayout] = useState(false);

  if (!user) {
    return (
      <div>
        <p>Please Log In or Sign Up to access. </p>
        <Link to='/login'>Log In</Link> or <Link to='/signup'>Sign Up</Link>
      </div>
    );
  }

  const toggleLayout = () => {
    setIsGridLayout(!isGridLayout);
  };

  const handleReviewClick = (review) => {
    setSelectedReview(selectedReview === review ? null : review);
  };

  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReviewByUserAsync(reviewId))
    .then(() => {
      dispatch(fetchSingleUser(id));
      dispatch(fetchLeaderboard());
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        p: 3,
        borderRadius: '8%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
        }}
      >
        <Button variant='contained' sx={{ backgroundColor: '#9C94B1' }}>
          <StyledLink to={`/users/${id}/edit`}>Edit</StyledLink>
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <Avatar src={user.image} sx={{ width: 100, height: 100 }} />
        <Box sx={{ ml: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h6'>@{username}</Typography>
          <Typography variant='subtitle1'>
            {firstName} {lastName}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography>Leaderboard Rank: {rank}</Typography>
        <Typography>
          Number of Restaurants Visited: {restaurantVisits}
        </Typography>
      </Box>
      <Box sx={{ mt: 2, width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Reviews:</Typography>
          <IconButton onClick={toggleLayout}>
            {isGridLayout ? <GridIcon /> : <SoloIcon />}
          </IconButton>
        </Box>
        <Box
          sx={{
            display: isGridLayout ? 'grid' : 'block',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            overflowY: 'auto',
            maxHeight: '40vh',
            p: 1,
          }}
        >
          {reviews &&
            [...reviews]
              .sort((a,b) => b.id - a.id)
              .map((review) => (
              <Box
                key={review.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '200px',
                    position: 'relative',
                    cursor: 'pointer',
                    overflow: 'hidden',
                  }}
                  onClick={() => handleReviewClick(review)}
                >
                  <img
                    src={review.image}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  {selectedReview === review && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      <Typography
                        sx={{
                          color: 'white',
                          fontSize: '24px',
                          fontWeight: 'bold',
                        }}
                      >
                        <StyledLink to={`/restaurants/${review.placeId}`}>
                          {review.name}
                        </StyledLink>
                      </Typography>
                      <Typography
                        sx={{
                          color: 'white',
                          fontSize: '18px',
                          textAlign: 'center',
                        }}
                      >
                        {review.title}
                      </Typography>
                      <Button
                        onClick={() => handleDeleteReview(review.id)}
                      >
                        ❌
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
