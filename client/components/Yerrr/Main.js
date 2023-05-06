import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getLoggedInUserData } from '../../redux/actions/authActions';
import Now from './Now';

const Main = () => {
  const auth = useSelector((state) => state.auth);
  const user = auth.user;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedInUserData());
  }, [dispatch]);

  return (
    <div className='yerrr-tab-container'>
      {user && (
        <div>
          <nav className='yerrr-tab-nav'>
            <Link className='yerrr-tab-link' to='/yerrr/now'>
              Now
            </Link>
            <Link className='yerrr-tab-link' to='#'>
              Yerrr
            </Link>
            <Link className='yerrr-tab-link' to='/yerrrchat'>
              Chat
            </Link>
          </nav>
          <Now />
        </div>
      )}
    </div>
  );
};

export default Main;
