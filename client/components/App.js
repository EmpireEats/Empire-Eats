import React from 'react';
import NavBar from './NavBar';
import Login from './User/Login';
import SignUp from './User/SignUp';
import YerrrChat from './YerrrChat';
import { Routes, Route } from 'react-router';
import Main from './Yerrr/Main';
import Now from './Yerrr/Now';
import Leaderboard from './Leaderboard/Leaderboard';

const App = () => {
  return (
    <div className='app-container'>
      <NavBar />
      <p>My App</p>
      <p>Hi!</p>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/yerrr' element={<Main />} />
        <Route path='/yerrrchat' element={<YerrrChat />} />
        <Route path='/yerrr/now' element={<Now />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
      </Routes>
    </div>
  );
};

export default App;
