import React, { useEffect, useState } from "react";
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
      <Link to="/home/leaderboard">
        <button>Leaderboard</button>
      </Link>
      <Link to="/home/feed">
        <button>Feed</button>
      </Link>
      <ul>
        {feed.map((review, index) => (
          <li key={index}>
            <img src={review.pictureUrl} alt={review.username} />
            <div>{review.name}</div>
            <div> {review.address}</div>
            <div>{review.previewText}-</div>
            {/* <div>Reviewed by: {review.username}</div> */}
            <div>Reviewed by: <Link to={`/users/${review.username}`}>{review.username}</Link></div>
            <div>Posted on: {review.createdAt}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;

