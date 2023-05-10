import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getLoggedInUserData } from '../../redux/actions/authActions';
import Now from './Now';
import YerrrForm from './YerrrForm';
import YerrrChat from './YerrrChat';

const Main = () => {
  const auth = useSelector((state) => state.auth);
  const messages = useSelector((state) => state.yerrrChat.messages);
  const user = auth.user;
  const dispatch = useDispatch();
  const [chatEnabled, setChatEnabled] = useState(false);
  const location = useLocation();
  const postId = location.state?.postId;
  console.log('postId from now:', postId);

  const handleChatEnabledChange = (enabled) => {
    setChatEnabled(enabled);
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
      {user && (
        <div>
          <nav className='yerrr-tab-nav'>
            <Link className='yerrr-tab-link' to='/yerrr/now'>
              Now
            </Link>
            <Link className='yerrr-tab-link' to='/yerrr/postYerrr'>
              Yerrr
            </Link>
            {chatEnabled && (
              <Link className='yerrr-tab-link' to='/yerrr/chat'>
                Chat
              </Link>
            )}
          </nav>
          <Routes>
            <Route
              path='now'
              element={<Now onChatEnabledChange={handleChatEnabledChange} />}
            />
            <Route path='postYerrr' element={<YerrrForm />} />
            {chatEnabled && (
              <Route path='chat' element={<YerrrChat postId={postId} />} />
            )}
          </Routes>
        </div>
      )}
    </div>
  );
};

export default Main;
