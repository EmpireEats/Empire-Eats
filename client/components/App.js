import React from "react";
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

const App = () => {
  const dispatch = useDispatch();
  const socketRef = React.useRef(null);

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
    <div className="app-container">
      <NavBar />
      <Routes>
        <Route path="/" element={<Leaderboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/yerrr/*" element={<Main />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/users/:id/edit" element={<EditProfile />} />
        <Route path="/restaurants" element={<WeOutside />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/home/leaderboard" element={<Leaderboard />} />
        <Route path="/home/feed" element={<Feed />} />
      </Routes>
    </div>
  );
};

export default App;
