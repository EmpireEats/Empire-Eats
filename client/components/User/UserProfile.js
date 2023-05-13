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
  const firstname = user.firstName;
  const lastname = user.lastName;
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
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link to={`/users/${id}/edit`}>
          <button>Edit</button>
        </Link>
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src='https://ih1.redbubble.net/image.1046392278.3346/mp,840x830,matte,f8f8f8,t-pad,1000x1000,f8f8f8.jpg' width={100} />
          <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
            <h4 style={{ margin: '0', alignSelf: 'flex-start' }}>@{username}</h4>
            <h5 style={{ margin: '0', alignSelf: 'flex-start' }}>{firstname} {lastname}</h5>
            <h6 style={{ margin: '0', alignSelf: 'flex-start' }}>📍Brooklyn, New York</h6>
          </div>
        </div>
        <div>
          <p>Placeholder for Leaderboard Rank</p>
          <p>Placeholder for Number of Restaurants Visited Count</p>
        </div>
        <div>
          {/* Will be revised to display images of food reviews like IG, where a user can expand by clicking on the picture*/}
          <p>Reviews:</p>
          {reviews && reviews.map((review) => (
            <div key={review.id}>
              <ul>{review.name} : {review.body}</ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserProfile;