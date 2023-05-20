import React, { useEffect,useState} from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import NavBar from "./NavBar";
import Login from "./User/Login";
import SignUp from "./User/SignUp";
import {
  receiveMessage,
  updateChatMessages,
} from "../redux/actions/yerrrChatActions";
import { Routes, Route } from "react-router";
import Main from "./Yerrr/Main";
import Leaderboard from "./Leaderboard/Leaderboard";
import UserProfile from "./User/UserProfile";
import EditProfile from "./User/EditProfile";
import WeOutside from "./Restaurants/WeOutside";
import Feed from "./Leaderboard/Feed";
import ReviewsForRestaurant from "./Reviews/ReviewsForRestaurant";
import { getLoggedInUserData } from "../redux/actions/authActions";
import RestaurantProfile from "./Restaurants/RestaurantProfile";
import Modal from 'react-modal';
import Instructions from './Yerrr/Instructions'

const App = () => {
  const dispatch = useDispatch();
  const socketRef = React.useRef(null);

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

  React.useEffect(() => {
    const newSocket = io("http://localhost:3000");
    socketRef.current = newSocket;
    console.log("Socket connection created:", newSocket);

    const handleMessage = (message) => {
      console.log("Received message:", message);
      dispatch(receiveMessage(message));
    };

    const handleLatestMessages = (messages) => {
      console.log("Received latest messages:", messages);
      dispatch(updateChatMessages(messages));
    
    };

    

    if (socketRef.current) {
      socketRef.current.on("message", handleMessage);
      socketRef.current.on("latestMessages", handleLatestMessages);

      // Emit the requestMessages event to get the latest messages from the server
      socketRef.current.emit("requestMessages");
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off("message", handleMessage);
        socketRef.current.off("latestMessages", handleLatestMessages);
        socketRef.current.disconnect();
        console.log("Socket connection closed");
      }
    };
  }, [dispatch]);

  return (
    <>
      <button id='modal' onClick={openModal}>
        i
      </button>
      <Modal
        className='weOutside-modal'
        overlayClassName='weOutside-modal-overlay'
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel='Yerrr Tab Instructions'>
        <Instructions closeModal={closeModal} />
      </Modal>
    <div className="app-container">
      <NavBar />
      <Routes>
        <Route path="/" element={<Leaderboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/yerrr/*" element={<Main />} />
        <Route path="/users/profile/:username" element={<UserProfile />} />
        <Route path="/users/:id/edit" element={<EditProfile />} />
        <Route path="/restaurants" element={<WeOutside />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/home/leaderboard" element={<Leaderboard />} />
        <Route path="/home/feed" element={<Feed />} />
        <Route path="/reviews/:placeId" element={<ReviewsForRestaurant />} />
        <Route path="/restaurants/:placeId" element={<RestaurantProfile />} />
      </Routes>
    </div>
    </>
  );
};

export default App;
