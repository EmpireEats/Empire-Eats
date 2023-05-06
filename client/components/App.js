import React from 'react';
import NavBar from './NavBar';
import Login from './User/Login';
import SignUp from './User/SignUp';
import YerrrChat from './YerrrChat';
import { Routes, Route } from 'react-router';
import Main from './Yerrr/Main';
import YerrrForm from './YerrrForm';
import PostsList from './PostList';

const App = () => {
  return (
    <div className='app-container'>
      <NavBar />
      <p>My App</p>
      <p>Hi!</p>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/yerrrchat' element={<YerrrChat />} />
        <Route path='/yerrrform' element={<YerrrForm/>} />
        <Route path='/yerrr' element={<Main />} />
        <Route path='/postlist' element={<PostsList />} />
      </Routes>
    </div>
  );
};

export default App;
