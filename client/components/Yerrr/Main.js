import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getLoggedInUserData } from '../../redux/actions/authActions';
import Now from './Now';
import YerrrForm from './YerrrForm';
import YerrrChat from './YerrrChat';
import Modal from 'react-modal';
import Instructions from './Instructions';

const Main = () => {
  const auth = useSelector((state) => state.auth);
  const messages = useSelector((state) => state.yerrrChat.messages);
  const user = auth.user;
  const dispatch = useDispatch();
  const [chatEnabled, setChatEnabled] = useState(false);
  const location = useLocation();
  const postId = location.state?.postId;
  Modal.setAppElement('#root');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    dispatch(getLoggedInUserData());
  }, [dispatch]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && chatEnabled) {
        console.log('Requesting latest messages');
        dispatch({ type: 'REQUEST_LATEST_MESSAGES' });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [chatEnabled, dispatch]);

  return (
    <div className='yerrr-tab-container'>
      <div>
        <nav className='yerrr-tab-nav'>
          <Link className='yerrr-tab-link' to='/yerrr/now'>
            Now
          </Link>
          {user && (
            <Link className='yerrr-tab-link' to='/yerrr/postYerrr'>
              Yerrr
            </Link>
          )}
          {chatEnabled && user && (
            <Link className='yerrr-tab-link' to='/yerrr/chat'>
              Chat
            </Link>
          )}
        </nav>
        <Routes>
          <Route
            path='now'
            element={<Now onChatEnabledChange={setChatEnabled} />}
          />
          {user && (
            <Route
              path='postYerrr'
              element={<YerrrForm onChatEnabledChange={setChatEnabled} />}
            />
          )}
          {chatEnabled && user && (
            <Route path='chat' element={<YerrrChat postId={postId} />} />
          )}
        </Routes>
        <button onClick={openModal}>i</button>
        <Modal
          className='weOutside-modal'
          overlayClassName='weOutside-modal-overlay'
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel='Yerrr Tab Instructions'>
          <Instructions closeModal={closeModal} />
        </Modal>
      </div>
    </div>
  );
};

export default Main;
