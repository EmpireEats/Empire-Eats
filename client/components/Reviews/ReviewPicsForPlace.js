import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchReviewsByPlaceAsync } from '../../redux/actions/reviewActions';
import '../../../public/styles/weOutside.css'

const ReviewPicsForPlace = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.review.allReviews);
  const { placeId } = useParams();

  useEffect(() => {
    console.log('PlaceId:', placeId);
    dispatch(fetchReviewsByPlaceAsync(placeId));
  }, [dispatch, placeId]);
  
  return (
    <div className="review-image-container">
      {reviews.map((review) => (
        review.image && (
          <div key={review.id} className="restaurant-review">
            <img className="review-image" src={review.image} alt="Review" />
          </div>
        )
      ))}
    </div>
  );  
};

export default ReviewPicsForPlace;