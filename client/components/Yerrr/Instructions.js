import React from 'react';

const Instructions = ({ closeModal }) => {
  return (
    <div
      className='instructions-container'
      style={{
        maxHeight: '40vh',
        overflowY: 'auto',
      }}>
      <h1>Yerrr!</h1>
      <p>Here's how to use the Yerrr tab!</p>
      <h4>Now</h4>
      <p>Hit the thumbs up if you would like to interact with someones Yerrr</p>
      <p>
        Hit the thumbs down if you would like to hide a user's post from your
        feed
      </p>
      <p>
        When you initiate an interaction with a user's "Yerrr", start a
        conversation and make plans with your new food partner!
      </p>
      <p>
        Change your mind? Press the "Nvm.." button to go back to the feed and
        try another Yerrr!
      </p>
      <h4>Create a Yerrr post</h4>
      <p>
        Type your message in the text box and specify if you want a "1 on 1"
        food experience or a "group" experience
      </p>
      <p>Create your post and wait for someone to answer!</p>
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default Instructions;
