import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getLoggedInUserData } from '../../redux/actions/authActions';
import Now from './Now';
import YerrrForm from './YerrrForm';
import YerrrChat from './YerrrChat';

const Main = () => {
  const auth = useSelector((state) => state.auth);
  const user = auth.user;
  const dispatch = useDispatch();
  const [chatEnabled, setChatEnabled] = useState(false);
  const [nowEnabled, setNowEnabled] = useState(true);
  const [yerrrEnabled, setYerrrEnabled] = useState(true);
  const [currentPostId, setCurrentPostId] = useState(null);
  const location = useLocation();
  const postId = location.state?.postId;

  useEffect(() => {
    const postIdFromLocation = location.state?.postId;
    if (postIdFromLocation) {
      setCurrentPostId(postIdFromLocation);
    }
  }, [location]);

  useEffect(() => {
    dispatch(getLoggedInUserData());
  }, [dispatch]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && chatEnabled) {
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
          {nowEnabled && (
            <Link className='yerrr-tab-link' to='/yerrr/now'>
              FEED
            </Link>
          )}
          {yerrrEnabled && user && (
            <Link className='yerrr-tab-link' to='/yerrr/postYerrr'>
              POST
            </Link>
          )}
          {chatEnabled && user && (
            <Link className='yerrr-tab-link' to='/yerrr/chat'>
              CHAT
            </Link>
          )}
        </nav>
        <Routes>
          <Route
            path='now'
            element={
              <Now
                nowEnabled={setNowEnabled}
                yerrrEnabled={setYerrrEnabled}
                onChatEnabledChange={setChatEnabled}
              />
            }
          />
          {user && (
            <Route
              path='postYerrr'
              element={
                <YerrrForm
                  nowEnabled={setNowEnabled}
                  yerrrEnabled={setYerrrEnabled}
                  onChatEnabledChange={setChatEnabled}
                />
              }
            />
          )}
          {chatEnabled && user && (
            // <Route path='chat' element={<YerrrChat postId={postId} />} />
            <Route
              path='chat'
              element={
                <YerrrChat
                  chatEnabled={setChatEnabled}
                  postId={currentPostId}
                  nowEnabled={setNowEnabled}
                  yerrrEnabled={setYerrrEnabled}
                />
              }
            />
          )}
        </Routes>
      </div>
    </div>
  );
};

export default Main;
