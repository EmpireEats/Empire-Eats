import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeed } from "../../redux/actions/feedActions";
import { Link } from "react-router-dom";
import "../../../public/styles/feed.css";
import "../../../public/styles/index.css";

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

  return (
    <div className="feed-container">
      <Link to="/home/leaderboard">
        <button
          style={{
            backgroundColor: activeButton === "Leaderboard" ? "gray" : "white",
          }}
          onMouseDown={() => setActiveButton("Leaderboard")}
          onMouseUp={() => setActiveButton(null)}
        >
          Leaderboard
        </button>
      </Link>
      <Link to="/home/feed">
        <button
          style={{
            backgroundColor: activeButton === "Feed" ? "gray" : "white",
          }}
          onMouseDown={() => setActiveButton("Feed")}
          onMouseUp={() => setActiveButton(null)}
        >
          Feed
        </button>
      </Link>

      <ul className="feed-list">
        {feed.slice(0, visibleReviews).map((review, index) => (
          <li key={index}>
            <img
              src={review.image}
              alt={review.username}
              style={{ width: "500px", height: "500px" }}
            />

            <h2>
              <div>{review.name}</div>
              <div>{review.address}</div>
            </h2>

            <h4>
              <div>
                Reviewed by:{" "}
                <Link to={`/users/${review.username}`}>{review.username}</Link>
              </div>
              <div>Posted on: {review.createdAt}</div>
            </h4>

            <h3>
              <div>"{review.previewText}"</div>
            </h3>
          </li>
        ))}
      </ul>

            {/* UNCOMMENT THIS CODE AFTER DEMO */}

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
