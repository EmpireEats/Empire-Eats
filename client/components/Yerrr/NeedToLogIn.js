import React from 'react';
import { Link } from 'react-router-dom';

const NeedToLogIn = () => {
  return (
    <div>
      <h1>Hol' on! 😱</h1>
      <p>You need to be logged in to use this feature!</p>
      <p>
        <Link to='/login'>Log In</Link> or <Link to='/signup'>Sign Up</Link>
      </p>
    </div>
  );
};

export default NeedToLogIn;
