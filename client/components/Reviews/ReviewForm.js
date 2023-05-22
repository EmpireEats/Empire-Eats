import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReviewAsync } from '../../redux/actions/reviewActions';
import Modal from 'react-modal';
import '../../../public/styles/weOutside.css';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');

const ReviewForm = ({ placeId, restaurantName, restaurantAddress }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [remainingChars, setRemainingChars] = useState(300);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addReviewAsync({ placeId: placeId, name: restaurantName, address: restaurantAddress, body, image }))
      .then(() => {
        setModalIsOpen(true);
        setBody('');
        setImage(null);
      });
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const closeModal = () => {
    setModalIsOpen(false);
    navigate('/leaderboard');
  };

  const openLink = () => {
    window.open('https://crapp.onrender.com/', '_blank');
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
    setRemainingChars(300 - e.target.value.length);
  };

  return (
    <div className='review-form-component' onClick={handleClick}>
      <h2>Tell us about your food:</h2>
      <form className="review-form" onSubmit={handleSubmit}>
        <input type="hidden" name="placeId" value={placeId} />
        <input type="hidden" name="restaurantName" value={restaurantName} />
        <input type="hidden" name="restaurantAddress" value={restaurantAddress} />
        <label htmlFor="body"></label>
        <textarea
          id="body"
          className="review-textarea"
          value={body}
          onChange={handleBodyChange}
          maxLength={300}
        />
        <p className="remaining-chars">{remainingChars} characters remaining</p>
        <br/>
        <label htmlFor="image">Show off your food:</label>
        <input 
          type="file" 
          id="image" 
          name="image" 
          accept="image/*"
          onChange={handleImageChange}
          required 
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <Modal
      className='weOutside-modal'
      overlayClassName="weOutside-modal-overlay"
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Take me to crAPP"
      >
      <div className="ModalView">
      <p className="italic">Review posted!</p>
      <p>
         In need of a post-meal porcelain sanctuary? Look no further! Click the link for a spotless haven to answer nature's call. Trust us, it's a potty paradise!
       </p>
      <a href="https://crapp.onrender.com/" onClick={openLink} target="_blank" rel="noopener noreferrer">
      Take me to CrAPP
      </a>
      <br />
    <button onClick={closeModal}>I'm Good</button>
  </div>
</Modal>
    </div>
  );
};

export default ReviewForm;