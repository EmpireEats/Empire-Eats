import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveMessage } from '../../redux/actions/yerrrChatActions';
import { useSocket } from '../../contexts/SocketContext';
import { useNavigate } from 'react-router';
import { fetchPostForChat } from '../../redux/actions/postActions';

const YerrrChat = ({ postId, nowEnabled, yerrrEnabled, chatEnabled }) => {
  console.log('2. inside chat -> post id: ', postId);
  const messages = useSelector((state) =>
    state.yerrrChat.messages.filter((message) => message.postId === postId)
  );
  const [currentMessage, setCurrentMessage] = useState('');
  const dispatch = useDispatch();
  const socket = useSocket();
  const auth = useSelector((state) => state.auth);
  const username = auth.user.username;
  const userId = auth.user.id;
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(true);
  const loading = useSelector((state) => state.post.loading);
  const post = useSelector((state) => state.post.activePostForChat);
  console.log('post inside of chat: ', post);

  useEffect(() => {
    dispatch(fetchPostForChat({ postId }));
    const timer = setTimeout(() => {
      setIsChatOpen(false);
    }, 600000);

    return () => clearTimeout(timer);
  }, [dispatch, postId]);

  const handleDeletePostRef = useRef();

  useEffect(() => {
    if (socket) {
      handleDeletePostRef.current = (deletedPostId) => {
        if (deletedPostId === postId) {
          nowEnabled(true);
          yerrrEnabled(true);
          chatEnabled(false);
          navigate('/yerrr/now');
        }
      };

      socket.on('deletePost', handleDeletePostRef.current);

      return () => {
        socket.off('deletePost', handleDeletePostRef.current);
      };
    }
  }, [socket, postId, nowEnabled, yerrrEnabled, chatEnabled, navigate]);

  const closePosting = () => {
    if (socket) {
      socket.emit('deletePost', postId);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp || Date.now());
    return `${date.getHours().toString().padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (isChatOpen && currentMessage.trim()) {
      if (socket) {
        console.log('sending message...', currentMessage);
        socket.emit('message', {
          sender: username,
          text: currentMessage,
          postId,
          timestamp: Date.now(),
        });
        setCurrentMessage('');
      } else {
        console.error('Socket reference is undefined.');
      }
    } else {
      console.log('Chat is closed.');
    }
  };

  const removeUserInteraction = () => {
    console.log('remove interaction - postId: ', postId);
    if (socket) {
      socket.emit('removeUserInteraction', { postId, userId });
    }
    navigate('/yerrr/now');
  };

  if (loading || !post || !postId) return <p>Loading...</p>;

  return (
    <div className='chat-container'>
      <div className='chat-window'>
        {messages.map((message, index) => (
          // <div
          //   key={`${message.sender}-${index}`}
          //   className={`message ${message.sender}`}>
          <div
            key={`${message.sender}-${index}`}
            className={`message ${
              message.sender === username ? 'isSender' : 'isReceiver'
            }`}>
            <div className='message-info'>
              <span className='sender-name'>{message.sender}</span>
              <span className='message-time'>
                {formatDate(message.timestamp)}
              </span>
            </div>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className='message-form'>
        <input
          type='text'
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder='Type your message...'
        />
        <button type='submit' disabled={!isChatOpen}>
          Send
        </button>
      </form>
      {!isChatOpen && <div>Chat is closed.</div>}
      {post.userId === userId ? (
        <button id='nvm' onClick={closePosting}>
          Close Post
        </button>
      ) : (
        <button id='nvm' onClick={removeUserInteraction}>
          Nvm..
        </button>
      )}
    </div>
  );
};

export default YerrrChat;
