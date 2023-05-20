import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchSingleUser } from '../../redux/actions/authActions';
import { fetchLeaderboard } from '../../redux/actions/leaderboardActions';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const user = useSelector((state) => state.auth.user);

  const leaderboard = useSelector((state) => state.leaderboard.leaderboard);
  
  useEffect(() => {
    dispatch(fetchSingleUser({username}));
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  const rank = leaderboard.findIndex((user) => user.name === username) + 1;
  const restaurantVisits = leaderboard.find((user) => user.name === username)?.restaurantVisitCount;

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

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link to={`/users/${user.id}/edit`}>
          <button>Edit</button>
        </Link>
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={user.image}
            width={100}
            style={{
              borderRadius: "50%",
              objectFit: "cover",}}
          />
          <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
            <h4 style={{ margin: '0', alignSelf: 'flex-start' }}>@{username}</h4>
            {/* <h5 style={{ margin: '0', alignSelf: 'flex-start' }}>{firstName} {lastName}</h5> */}
            <h6 style={{ margin: '0', alignSelf: 'flex-start' }}>📍Brooklyn, New York</h6>
          </div>
        </div>
        <div>
          <p>Leaderboard Rank: {rank}</p>
          <p>Number of Restaurants Visited: {restaurantVisits}</p>
        </div>
        <div>
          <div>
            <p>Reviews:</p>
            <button onClick={toggleLayout}>
              {isGridLayout ? 'Grid' : 'Solo'}
            </button>
          </div>
          <div style={{ display: isGridLayout ? 'grid' : 'block', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', overflowY: 'auto', maxHeight: '40vh', padding: '8px' }}>
            {user && user.reviews && user.reviews.map((review) => (
              <div key={review.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
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
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {selectedReview === review && (
                    <div
                      style={{
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
                      <p style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                        {review.name}
                      </p>
                      <p style={{ color: 'white', fontSize: '18px', textAlign: 'center' }}>
                        {review.body}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;