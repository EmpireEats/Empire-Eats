import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveMessage } from '../redux/actions/yerrrChatActions';
import io from 'socket.io-client';

const YerrrChat = () => {
  const messages = useSelector((state) => state.yerrrChat.messages);
  const [currentMessage, setCurrentMessage] = useState('');
  const dispatch = useDispatch();
  const socketRef = useRef(null);

  useEffect(() => {
    if (!socketRef.current) {
      const newSocket = io('https://localhost:3000');
      socketRef.current = newSocket;
      console.log('Socket connection created:', newSocket);
    }

    const handleMessage = (message) => {
      console.log('Received message:', message);
      dispatch(receiveMessage(message));
    };

    socketRef.current.on('message', handleMessage);

    return () => {
      if (socketRef.current) {
        socketRef.current.off('message', handleMessage);
      }
    };
  }, [dispatch, socketRef]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (currentMessage.trim()) {
      console.log('sending message...', currentMessage);
      socketRef.current.emit('message', {
        sender: 'you',
        text: currentMessage,
      });
      setCurrentMessage('');
    }
  };

  return (
    <div className='chat-container'>
      <div className='chat-window'>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
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
        <button type='submit'>Send</button>
      </form>
    </div>
  );
};

export default YerrrChat;
