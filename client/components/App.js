import React from 'react';
import NavBar from './NavBar';
import Login from './User/Login';
import SignUp from './User/SignUp';
import { Routes, Route } from 'react-router';
import Main from './Yerrr/Main';
import Leaderboard from './Leaderboard/Leaderboard';
import UserProfile from './User/UserProfile';
import EditProfile from './User/EditProfile';
import WeOutside from './Restaurants/WeOutside';

const App = () => {
  return (
    <div className='app-container'>
      <NavBar />
      <p>My App</p>
      <p>Hi!</p>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/yerrr/*' element={<Main />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='/users/:id' element={<UserProfile />} />
        <Route path='/users/:id/edit' element={<EditProfile />} />
        <Route path='/restaurants' element={<WeOutside />} />
      </Routes>
    </div>
  );
};

export default App;
