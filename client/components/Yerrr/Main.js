import React, { useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getLoggedInUserData } from '../../redux/actions/authActions';
import Now from './Now';
import YerrrForm from './YerrrForm';
import YerrrChat from './YerrrChat';

const Main = () => {
  const auth = useSelector((state) => state.auth);
  const user = auth.user;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedInUserData());
  }, [dispatch]);

  return (
    <div className='yerrr-tab-container'>
      {user && (
        <div>
          <nav className='yerrr-tab-nav'>
            <Link className='yerrr-tab-link' to='/yerrr/now'>
              Now
            </Link>
            <Link className='yerrr-tab-link' to='/yerrr/postYerrr'>
              Yerrr
            </Link>
            <Link className='yerrr-tab-link' to='/yerrr/chat'>
              Chat
            </Link>
          </nav>
          <Routes>
            <Route path='now' element={<Now />} />
            <Route path='postYerrr' element={<YerrrForm />} />
            <Route path='chat' element={<YerrrChat />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default Main;
