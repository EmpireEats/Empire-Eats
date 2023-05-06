import React from 'react';
import { useNavigate } from 'react-router';
import '../../../public/styles/now.css';

const Now = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/chat');
  };

  return (
    <div className='user-post-list'>
      <div className='user-post'>
        <p>User: Alice</p>
        <p>Post Description: "Going to eat at KPot!"</p>
        <p>1 on 1</p>
        <button onClick={handleNavigate}>👍🏽</button>
        <span>
          <button>👎🏽</button>
        </span>
      </div>
      <div className='user-post'>
        <p>User: John</p>
        <p>Post Description: "Going to get sushi!"</p>
        <p>Group</p>
        <button onClick={handleNavigate}>👍🏽</button>
        <span>
          <button>👎🏽</button>
        </span>
      </div>
    </div>
  );
};

export default Now;
