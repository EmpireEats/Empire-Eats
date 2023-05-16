import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { addReviewAsync } from '../../redux/actions/reviewActions';
import Modal from 'react-modal';
import '../../../public/styles/weOutside.css';

Modal.setAppElement('#root');

const ReviewForm = ({ placeId, restaurantName, restaurantAddress }) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [file, setFile] = useState(null);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    dispatch(addReviewAsync({ placeId: placeId, name: restaurantName, address: restaurantAddress, body, image }))
      .then(() => {
        setModalIsOpen(true);
        setBody('');
        setImage('');
      });
  };

  // const handleSubmit = async (evt) => {
  //   evt.preventDefault();
  
  //   // Create a FormData object to include the file
  //   const formData = new FormData();
  //   formData.append('placeId', placeId);
  //   formData.append('name', restaurantName);
  //   formData.append('address', restaurantAddress);
  //   formData.append('body', body);
  
  //   if (file) {
  //     formData.append('picture', file);
  //   }
  
  //   dispatch(addReviewAsync(formData))
  //     .then(() => {
  //       setModalIsOpen(true);
  //       setBody('');
  //       setFile(null);
  //     });
  // };  

  const handleClick = (event) => {
    event.stopPropagation();
  };

  const closeModal = () => {
    setModalIsOpen(false);
    // navigate('/');
  };

  const openLink = () => {
    window.open('https://example.com', '_blank');
  };

  return (
    <div onClick={handleClick}>
      <h2>Add a review</h2>
      <form onSubmit={handleSubmit}>
          <input type="hidden" name="placeId" value={placeId} />
          <br />
          <input type="hidden" name="restaurantName" value={restaurantName} />
          <br />
          <input type="hidden" name="restaurantAddress" value={restaurantAddress} />
          <br />
          <label htmlFor="body">Review:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
          <br />
          <label htmlFor="image">Image URL:</label>
          <input 
            type="url" 
            id="image" 
            name="image" 
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required 
          />
          {/* <label htmlFor="picture">Upload a picture:</label>
          <input
            type="file"
            id="picture"
            name="picture"
            accept="image/*" // Only accept image files
            onChange={(e) => setFile(e.target.files[0])}
          /> */}
          <br />
          <button type="submit">Submit</button>
        </form>
      <Modal
        className='weOutside-modal'
        overlayClassName="weOutside-modal-overlay"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        // shouldCloseOnOverlayClick={false}
        contentLabel="Take me to crAPP"
      >
        <p>Review posted!</p>
        <p>In need of a post-meal porcelain sanctuary? Look no further! Click the link for a spotless haven to answer nature's call. Trust us, it's a potty paradise!</p>
        <a href="https://example.com" 
        onClick={openLink} 
        target="_blank" 
        rel="noopener noreferrer">
          Take me to CrAPP
        </a>
        <br />
        <button onClick={closeModal}>I'm Good</button>
      </Modal>
    </div>
  );
};

export default ReviewForm;