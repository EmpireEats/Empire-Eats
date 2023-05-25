import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import NavBar from './NavBar';
import Login from './User/Login';
import SignUp from './User/SignUp';
import {
  receiveMessage,
  updateChatMessages,
} from '../redux/actions/yerrrChatActions';
import { Routes, Route } from 'react-router';
import Main from './Yerrr/Main';
import Leaderboard from './Leaderboard/Leaderboard';
import UserProfile from './User/UserProfile';
import EditProfile from './User/EditProfile';
import LimtedProfile from './User/LimitedProfile';
import WeOutside from './Restaurants/WeOutside';
import Feed from './Leaderboard/Feed';
import ReviewsForRestaurant from './Reviews/ReviewsForRestaurant';
import { getLoggedInUserData } from '../redux/actions/authActions';
import RestaurantProfile from './Restaurants/RestaurantProfile';
import Modal from 'react-modal';
import Instructions from './Yerrr/Instructions';
import HomePage from './Leaderboard/HomePage';
import { useLocation } from 'react-router';
import YerrrModal from './InfoModals/YerrrModal';
import WeOutsideModal from './InfoModals/WeOutsideModal';
import UserProfileModal from './InfoModals/UserProfileModal';
import LeaderboardModal from './InfoModals/LeaderboardModal';
import LoggedOutModal from './InfoModals/LoggedOutModal';
import '../../public/styles/weOutside.css';

Modal.setAppElement('#root');

const App = () => {
  const dispatch = useDispatch();
  const socketRef = React.useRef(null);
  const location = useLocation();
  const loggedInUser = useSelector((state) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);

  const handleModalClick = () => {
    // If the user is not logged in, always show the logged out modal.
    if (!loggedInUser) {
      setModalComponent(<LoggedOutModal />);
    } else if (location.pathname.includes('/yerrr')) {
      setModalComponent(<YerrrModal />);
    } else if (location.pathname.includes('/users')) {
      setModalComponent(<UserProfileModal />);
    } else if (
      location.pathname.includes('/restaurants') ||
      location.pathname.includes('/reviews')
    ) {
      setModalComponent(<WeOutsideModal />);
    } else if (
      location.pathname === '/leaderboard' ||
      location.pathname === '/feed' ||
      location.pathname === '/home/leaderboard' ||
      location.pathname === '/home/feed'
    ) {
      setModalComponent(<LeaderboardModal />);
    } else {
      setModalComponent(<LoggedOutModal />);
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(getLoggedInUserData());
  }, [dispatch]);

  React.useEffect(() => {
    const newSocket = io('http://localhost:3000');
    socketRef.current = newSocket;

    const handleMessage = (message) => {
      dispatch(receiveMessage(message));
    };

    const handleLatestMessages = (messages) => {
      dispatch(updateChatMessages(messages));
    };

    if (socketRef.current) {
      socketRef.current.on('message', handleMessage);
      socketRef.current.on('latestMessages', handleLatestMessages);

      // Emit the requestMessages event to get the latest messages from the server
      socketRef.current.emit('requestMessages');
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off('message', handleMessage);
        socketRef.current.off('latestMessages', handleLatestMessages);
        socketRef.current.disconnect();
      }
    };
  }, [dispatch]);

  return (
    <>
      <button id='modal' onClick={() => handleModalClick()}>
        {/* i */} &#9432;
      </button>
      <Modal
        className='weOutside-modal'
        overlayClassName='weOutside-modal-overlay'
        isOpen={isModalOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={closeModal}>
        {modalComponent}
      </Modal>
      <div className='app-container'>
      { isModalOpen ? null : <NavBar /> }
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/yerrr/*' element={<Main />} />
          <Route path='/users/:id' element={<UserProfile />} />
          <Route path='/users/:id/edit' element={<EditProfile />} />
          <Route path='/users/profile/:username' element={<LimtedProfile />} />
          <Route path='/restaurants' element={<WeOutside />} />
          <Route path='/leaderboard' element={<Leaderboard />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/home/landingpage' element={<HomePage />} />
          <Route path='/home/leaderboard' element={<Leaderboard />} />
          <Route path='/home/feed' element={<Feed />} />
          <Route path='/reviews/:placeId' element={<ReviewsForRestaurant />} />
          <Route path='/restaurants/:placeId' element={<RestaurantProfile />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
