import React from 'react';
import '../../../public/styles/now.css';

const Now = () => {
  return (
    <div className='user-post-list'>
      <div className='user-post'>
        <p>User: Alice</p>
        <p>Post Description: "Going to eat at KPot!"</p>
        <p>1 on 1</p>
      </div>
      <div className='user-post'>
        <p>User: John</p>
        <p>Post Description: "Going to get sushi!"</p>
        <p>Group</p>
      </div>
    </div>
  );
};

export default Now;
