import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleUser } from '../../redux/actions/userActions';
import { getLoggedInUserData } from '../../redux/actions/authActions';

const UserProfile = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = auth.user;
  const username = user.username;
  const id = user.id;
  const reviews = useSelector((state) => state.auth.user.reviews);

  useEffect(() => {
    dispatch(fetchSingleUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getLoggedInUserData());
  }, [dispatch]);

  return (
    <>
      <div>
        <img src='https://ih1.redbubble.net/image.1046392278.3346/mp,840x830,matte,f8f8f8,t-pad,1000x1000,f8f8f8.jpg' width={200} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ marginRight: '10px' }}>{username}</h2>
          <Link to={`/users/${id}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        {reviews && reviews.map((review) => (
          <div key={review.id}>
            <p>Placeholder text for Restaurant Name</p>
            {/* need to revisit to chain or map through restaurants, to grab at least the restaurant name <p>{review.restaurantId}</p> */}
            <p>Rating: {review.rating}{'⭐'.repeat(review.rating)}</p>
            <p>Review: {review.body}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserProfile;