import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeed } from "../../redux/actions/feedActions";
import { Link } from "react-router-dom";
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

  const handleButtonMouseDown = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleButtonMouseUp = () => {
    setActiveButton(null);
  };

  return (
    <div className="feed-container">
      <div className="button-group">
        <Link to="/home/leaderboard">
          <button
            className={`feed-btn ${activeButton === "Leaderboard" ? "active" : ""}`}
            onMouseDown={() => handleButtonMouseDown("Leaderboard")}
            onMouseUp={() => handleButtonMouseUp()}
          >
            LEADERBOARD
          </button>
        </Link>
        <Link to="/home/feed">
          <button
            className={`feed-btn ${activeButton === "Feed" ? "active" : ""}`}
            onMouseDown={() => handleButtonMouseDown("Feed")}
            onMouseUp={() => handleButtonMouseUp()}
          >
            FEED
          </button>
        </Link>
      </div>

      <ul className="feed-list">
        {feed.slice(0, visibleReviews).map((review, index) => (
          <li key={index}>
            <img
              src={review.image}
              alt={review.username}
              style={{ width: "600px", height: "400px" }}
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
