import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeed } from "../../redux/actions/feedActions";
import { Link } from "react-router-dom";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed.feed);
  const loading = useSelector((state) => state.feed.loading);
  const error = useSelector((state) => state.feed.error);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  if (loading) {
    return <div>Loading feed...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="leader">
      <Link to="/home/leaderboard">
        <button>LEADERBOARD</button>
      </Link>
      <Link to="/home/feed">
        <button>FEED</button> 
      </Link>
      </div>
      <div className="feed">
      <ul>
        {feed.map((review, index) => (
          <li key={index}>
            {/* <img src={review.userPhotoUrl} alt={review.username} /> */}
            <img id="feed-pic" src={review.pictureUrl} alt={review.username} />
            <div className="feed-item">
            <div>{review.username}</div>
            <div>{review.previewText}</div>
            <div>Restaurant: {review.restaurantName}</div>
            </div>
          </li>
        ))}
      </ul>
    </div></div>
  );
};

export default Feed;
