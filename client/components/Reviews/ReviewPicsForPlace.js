import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchReviewsByPlaceAsync } from '../../redux/actions/reviewActions';
import '../../../public/styles/weOutside.css'

const ReviewPicsForPlace = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.review.allReviews);
  const { placeId } = useParams();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchReviewsByPlaceAsync({ placeId, page }));
  }, [dispatch, placeId, page]);

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="review-image-container" onScroll={handleScroll}>
      {reviews.map((review, index) => (
        review.image && (
          <div key={`${review.id}-${index}`} className="restaurant-review">
            <img className="review-image" src={review.image} alt="Review" />
          </div>
        )
      ))}
    </div>
  );  
};

export default ReviewPicsForPlace;