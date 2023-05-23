import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSocket } from '../../contexts/SocketContext';
import { useNavigate } from 'react-router';
import { fetchPostForChat } from '../../redux/actions/postActions';
import { Box, Typography, TextField, Button } from '@mui/material';
import Modal from 'react-modal';

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
  const [isChatModalOpen, setIsChatModalOpen] = useState(true);

  useEffect(() => {
    dispatch(fetchPostForChat(postId));
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

  const closeModal = () => {
    setIsModalOpen(false);
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

  const handleAccept = () => {
    console.log('accepting foodie buddie...');
    if (post.userId === userId) {
      closePosting();
    } else {
      removeUserInteraction();
    }
    navigate('/restaurants');
  };

  const handleCloseChat = () => {
    setIsChatModalOpen(false);
    if (post.userId !== userId) {
      removeUserInteraction();
    }
    navigate('/yerrr/now');
  };

  if (loading || !post || !postId) return <div className='spinner'></div>;

  return (
    <Modal
      isOpen={isChatModalOpen}
      onRequestClose={handleCloseChat}
      className='chat-modal'
      overlayClassName='chat-modal-overlay'
      contentLabel='Chat Modal'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          height: '60vh',
          overflowY: 'auto',
        }}>
        <Box
          sx={{
            flex: '1 1 auto',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            marginBottom: '16px',
          }}>
          {messages.map((message, index) => (
            <Box
              key={`${message.sender}-${index}`}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems:
                  message.sender === username ? 'flex-end' : 'flex-start',
              }}>
              <Typography variant='subtitle2'>{message.sender}</Typography>
              <Typography
                variant='body2'
                sx={{
                  backgroundColor:
                    message.sender === username ? '#9C94B1' : '#717882',
                  color: 'white',
                  borderRadius: '12px',
                  padding: '8px',
                  maxWidth: '80%',
                  wordWrap: 'break-word',
                }}>
                {message.text}
              </Typography>
              <Typography variant='caption'>
                {formatDate(message.timestamp)}
              </Typography>
            </Box>
          ))}
        </Box>
        <form onSubmit={handleSendMessage}>
          <TextField
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder='Type your message...'
            variant='outlined'
            fullWidth
            sx={{ marginBottom: '8px' }}
          />
          <Button
            type='submit'
            variant='contained'
            disabled={!isChatOpen}
            sx={{ backgroundColor: '#2B3434' }}>
            Send
          </Button>
        </form>
        {!isChatOpen && <Typography>Chat is closed.</Typography>}
        {post.userId === userId ? (
          <Button
            onClick={closePosting}
            variant='contained'
            color='secondary'
            sx={{ marginTop: '8px', backgroundColor: '#9C94B1' }}>
            Close Post
          </Button>
        ) : (
          <Button
            onClick={removeUserInteraction}
            variant='contained'
            color='secondary'
            sx={{ marginTop: '8px', backgroundColor: '#9C94B1' }}>
            Nvm..
          </Button>
        )}
        <Button
          onClick={handleAccept}
          variant='contained'
          color='primary'
          sx={{ marginTop: '8px', backgroundColor: '#2B3434' }}>
          Lets Eat!
        </Button>
      </Box>
    </Modal>
  );
};

export default YerrrChat;
