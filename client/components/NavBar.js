import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';

const NavBar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout());
  };

  return (
    <div className='nav-container'>
      {auth.token ? (
        <>
          <Link to='/' onClick={handleLogout}>Logout</Link>
          <Link to='/yerrr/now'>YERRR</Link>
          <Link to='/restaurants'>We Outside</Link>
          <Link to='/leaderboard'>Leaderboard</Link>
          <Link to='/users/:id'>👤</Link>
        </>
      ) : (
        <>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Sign Up</Link>
        </>
      )}
    </div>
  );
};

export default NavBar;
