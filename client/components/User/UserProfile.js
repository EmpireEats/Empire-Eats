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

  useEffect(() => {
    dispatch(fetchSingleUser(id)); 
  }, [dispatch, id]); 

  useEffect(() => {
    dispatch(getLoggedInUserData());
  }, [dispatch]);

  return (
    <>
      <div>
        <img src='https://ih1.redbubble.net/image.1046392278.3346/mp,840x830,matte,f8f8f8,t-pad,1000x1000,f8f8f8.jpg'width={200}/>
        <h2>{username}</h2>
        {/* place holder data, will pull reviews later */}
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