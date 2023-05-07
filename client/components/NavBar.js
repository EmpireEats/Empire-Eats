import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='nav-container'>
      <Link to='/login'>Login</Link>
      <Link to='/signup'>Sign Up</Link>
      <Link to='/'>⬅</Link>
      <Link to='/yerrr/now'></Link>
      <Link to='/users/profile'></Link>
      <Link to='/leaderboard'></Link>
      <Link to='/map'></Link>
    </div>
  );
};

export default NavBar;
