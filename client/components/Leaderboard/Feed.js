import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeed } from "../../redux/actions/feedActions";

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
      <h1>Real-Time Feed</h1>
      <ul>
        {feed.map((review, index) => (
          <li key={index}>
            <img src={review.userPhotoUrl} alt={review.username} />
            <div>{review.username}</div>
            <div>{review.previewText}</div>
            <div>Restaurant: {review.restaurantName}</div> 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;
