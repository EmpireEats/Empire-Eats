import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='nav-container'>
      <Link to='/login'>Login</Link>
      <Link to='/signup'>Sign Up</Link>
      <Link to='/'>⬅</Link>
      <Link to='/yerrr/now'>YERRR</Link>
      <Link to='/users/profile'>👤</Link>
      <Link to='/leaderboard'>Leaderboard</Link>
      <Link to='/restaurants'>Map</Link>
    </div>
  );
};

export default NavBar;
