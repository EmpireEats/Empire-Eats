import React from 'react';
import NavBar from './NavBar';
import Login from './User/Login';
import SignUp from './User/SignUp';
import YerrrChat from './YerrrChat';
import { Routes, Route } from 'react-router';
import Main from './Yerrr/Main';
import Now from './Yerrr/Now';
import SingleUser from './User/SingleUser';
import UserProfile from './User/UserProfile';
import EditProfile from './User/EditProfile';

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
        <Route path='/users/profile' element={<UserProfile />} />
        <Route path='/users/:id' element={<SingleUser />} />
        <Route path='/users/:id/edit' element={<EditProfile />} />
      </Routes>
    </div>
  );
};

export default App;
