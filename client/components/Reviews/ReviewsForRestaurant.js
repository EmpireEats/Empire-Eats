import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviewsByPlaceAsync } from '../../redux/actions/reviewActions';
import { clearReviews } from '../../redux/reducers/reviewReducer';
import '../../../public/styles/weOutside.css'

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="reviews-container">
      <h2 id='review'>Reviews:</h2>
      {status === 'loading' ? (
        <div className="loading-message">Loading reviews...
          <div className="spinner"></div>
        </div>
      ) : loggedInUser ? (
        reviews.map((review, index) => (
          <div className="review" key={index}>
            {review.image && (
              <div className="review-image">
                <img src={review.image} alt="Review" />
                <div className="review-content">
                  <p className="review-body">"{review.body}"</p>
                  <p className="review-date">{formatDate(review.createdAt)}</p>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className='error-message'>You need to be logged in to see reviews.</div>
      )}
      {loggedInUser && reviews.length < totalReviewsCount && status !== 'loading' && (
        <button className="load-more-button" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default ReviewsForRestaurant;