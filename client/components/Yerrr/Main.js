import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getLoggedInUserData } from '../../redux/actions/authActions';
import YerrrChat from '../YerrrChat';
import YerrrForm from '../YerrrForm';
import PostsList from '../PostList';


const Main = () => {
  const auth = useSelector((state) => state.auth);
  const user = auth.user;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedInUserData());
  }, [dispatch]);

  if (auth.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='yerrr-tab-container'>
      <nav className='yerrr-tab-nav'>
        <Link className='yerrr-tab-link' to='/PostList'>
          Now
        </Link>
        <Link className='yerrr-tab-link' to='/YerrrForm'>
          Yerrr
        </Link>
        <Link className='yerrr-tab-link' to='/YerrrChat'>
          Chat
        </Link>
        <p>Welcome Home, {user && user.firstName}</p>
      </nav>
    </div>
  );
};

export default Main;
