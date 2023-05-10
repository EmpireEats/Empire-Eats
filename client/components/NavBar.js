import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';

const NavBar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout());
    navigate('/login');
  };

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className='nav-container'>
      {auth.token ? (
        <>
          <Link to='/yerrr/now'>YERRR |</Link>
          <Link to='/restaurants'>We Outside |</Link>
          <Link to='/leaderboard'>Leaderboard |</Link>
          <div className='dropdown-container' onClick={handleDropdownClick}>
            <div className='dropdown-icon'>
              👤 <span className= 'dropdown-caret'></span>
            </div>
            {showDropdown && (
              <div className='dropdown-menu'>
                <Link to={`/users/${auth.user.id}`}>My Profile</Link>
                <Link to='/' onClick={handleLogout}>Logout</Link>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Link to='/login'>Login |</Link>
          <Link to='/signup'>Sign Up</Link>
        </>
      )}
    </div>
  );
};

export default NavBar;
