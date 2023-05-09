import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchSingleUser } from '../../redux/actions/userActions';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const loggedInUserId = useSelector((state) => state.auth.user.id);
  console.log(loggedInUserId)

  useEffect(() => {
    dispatch(fetchSingleUser(id));   
  }, [dispatch, id]);

  return (
    <>
    {/* place holder reviews also need clarification on user data */}
      <div>
        <p>Image goes here</p>
        <h2>Hi, {username}</h2>
        <br/>
        <p>User data</p>
        <p>User data</p>
        <p>User data</p>
        <p>Reviews</p>
        <Link to={`/users/${id}/edit`}>
          <button>Edit</button>
        </Link>
      </div>
    </>
  );
};

export default UserProfile;