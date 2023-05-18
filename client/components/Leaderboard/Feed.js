import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeed } from "../../redux/actions/feedActions";
import { Link } from "react-router-dom";
import "../../../public/styles/feed.css";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed.feed);
  const loading = useSelector((state) => state.feed.loading);
  const error = useSelector((state) => state.feed.error);
  const [visibleReviews, setVisibleReviews] = useState(10);
  const [reviewsToLoad, setReviewsToLoad] = useState(10);

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
        <button>Leaderboard</button>
      </Link>
      <Link to="/home/feed">
        <button>Feed</button>
      </Link>
      <button onClick={() => {
        setVisibleReviews(10);
        dispatch(fetchFeed());
      }}>
        Refresh
      </button>
      <ul className="feed-list">
        {feed.slice(0, visibleReviews).map((review, index) => (
          <li key={index}>
            <img
              src={review.image}
              alt={review.username}
              style={{ width: "500px", height: "500px" }}
            />
            {/* <img src={review.image} alt={`Review ${index}`} /> */}
            <div>{review.name}</div>
            <div>{review.address}</div>
            <div>{review.previewText}</div>
            <div>
              Reviewed by:{" "}
              <Link to={`/users/${review.username}`}>{review.username}</Link>
            </div>
            <div>Posted on: {review.createdAt}</div>
          </li>
        ))}
      </ul>
      {visibleReviews < feed.length && (
        <button onClick={() => setVisibleReviews(prevCount => prevCount + reviewsToLoad)}>
          Load More Reviews
        </button>
      )}
    </div>
      );
    };
    
    export default Feed;


// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchFeed } from "../../redux/actions/feedActions";
// import { Link } from "react-router-dom";
// import "../../../public/styles/feed.css";

// const Feed = () => {
//   const dispatch = useDispatch();
//   const feed = useSelector((state) => state.feed.feed);
//   const loading = useSelector((state) => state.feed.loading);
//   const error = useSelector((state) => state.feed.error);

//   useEffect(() => {
//     dispatch(fetchFeed());
//   }, [dispatch]);

//   if (loading) {
//     return <div>Loading feed...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="feed-container">
//       <Link to="/home/leaderboard">
//         <button>Leaderboard</button>
//       </Link>
//       <Link to="/home/feed">
//         <button>Feed</button>
//       </Link>
//       <ul className="feed-list">
//         {feed.map((review, index) => (
//           <li key={index}>
//             <img
//               src={review.image}
//               alt={review.username}
//               style={{ width: "500px", height: "500px" }}
//             />
//             {/* <img src={review.image} alt={`Review ${index}`} /> */}
//             <div>{review.name}</div>

//             <div>{review.address}</div>
//             <div>{review.previewText}</div>
//             <div>
//               Reviewed by:{" "}
//               <Link to={`/users/${review.username}`}>{review.username}</Link>
//             </div>
//             <div>Posted on: {review.createdAt}</div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Feed;
