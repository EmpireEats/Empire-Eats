import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFeed } from '../../redux/actions/feedActions';
import { Link } from 'react-router-dom';
import '../../../public/styles/index.css';
import Box from '@mui/material/Box';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed.feed);
  const loading = useSelector((state) => state.feed.loading);
  const error = useSelector((state) => state.feed.error);
  const [visibleReviews, setVisibleReviews] = useState(20);
  const [reviewsToLoad, setReviewsToLoad] = useState(20);
  const [activeButton, setActiveButton] = useState(null); // State to track the active button

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  if (loading) {
    return <div>Loading feed...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleButtonMouseDown = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleButtonMouseUp = () => {
    setActiveButton(null);
  };

  return (
    <div className='feed-container'>
      <Box
        className='leader'
        sx={{ backgroundColor: '#b5d2dd', marginTop: '15px' }}>
        <Link to='/home/leaderboard'>
          <button className='leader-button'>LEADERBOARD</button>
        </Link>
        <Link to='/home/feed'>
          <button className='leader-button'>FEED</button>
        </Link>
      </Box>
      <ul className='feed-list'>
        {feed.slice(0, visibleReviews).map((review, index) => (
          <li key={index}>
            <img
              src={review.image}
              alt={review.username}
              style={{ width: '600px', height: '400px' }}
            />

            <h2>
              <Link to={`/restaurants/${review.placeId}`}>{review.name}</Link>
              <div>{review.address}</div>
            </h2>

            <em>
              <h4>
                <div>
                  Reviewed by: {review.username}
                  {/* <Link to={`/users/${review.userId}`}>{review.username}</Link> */}
                </div>
                <div>Posted on: {review.createdAt}</div>
              </h4>
            </em>

            <h3>
              <div>"{review.previewText}"</div>
            </h3>
          </li>
        ))}
      </ul>

      {/* stretch goal - do not delete*/}

      {/* <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <button
          style={{
            marginRight: "10px",
            backgroundColor: activeButton === "Refresh" ? "gray" : "white",
          }}
          onMouseDown={() => setActiveButton("Refresh")}
          onMouseUp={() => {
            setActiveButton(null);
            setVisibleReviews(10);
            dispatch(fetchFeed());
          }}
        >
          Refresh
        </button>

        {visibleReviews < feed.length && (
          <button
            style={{
              backgroundColor:
                activeButton === "Load More Reviews" ? "gray" : "white",
            }}
            onMouseDown={() => setActiveButton("Load More Reviews")}
            onMouseUp={() => {
              setActiveButton(null);
              setVisibleReviews((prevCount) => prevCount + reviewsToLoad);
            }}
          >
            Load More Reviews
          </button>
        )}
      </div> */}
    </div>
  );
};

export default Feed;
