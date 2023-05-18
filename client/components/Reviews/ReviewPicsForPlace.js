import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchReviewsByPlaceAsync } from '../../redux/actions/reviewActions';
import '../../../public/styles/weOutside.css'


const ReviewPicsForPlace = () => {
  const dispatch = useDispatch();
  const { placeId } = useParams();
  const reviews = useSelector(state => state.review.allReviews);
  const [restaurantName, setRestaurantName] = useState("");

  // useEffect(() => {
  //   dispatch(fetchReviewsByPlaceAsync({ placeId, page: 1 }));
  // }, [dispatch, placeId]);

  useEffect(() => {
    dispatch(fetchReviewsByPlaceAsync({ placeId, page: 1 }))
      .then((result) => {
        if (result.payload && result.payload.reviews.length > 0) {
          setRestaurantName(result.payload.reviews[0].name);
        }
      });
  }, [dispatch, placeId]);

  return (
    <div className="review-component">
      <h2>Reviews for {restaurantName}</h2>
      <div className="review-grid">
        {reviews.map((review, index) => (
          <div className="review-item" key={index}>
            <img src={review.image} alt="Review"/>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default ReviewPicsForPlace;