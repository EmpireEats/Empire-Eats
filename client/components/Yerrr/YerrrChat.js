import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveMessage } from '../../redux/actions/yerrrChatActions';
import io from 'socket.io-client';
import { sendMessage, requestLatestMessages } from '../redux/actions/yerrrChatActions';
import { useSocket } from '../contexts/SocketContext';

const YerrrChat = () => {
  const messages = useSelector((state) => state.yerrrChat.messages);
  const [currentMessage, setCurrentMessage] = useState('');
  const dispatch = useDispatch();
  const socket = useSocket();


  const handleSendMessage = (e) => {
    e.preventDefault();
    if (currentMessage.trim()) {
      if (socket) {
        console.log('sending message...', currentMessage);
        socket.emit('message', { sender: 'you', text: currentMessage });
        setCurrentMessage('');
      } else {
        console.error('Socket reference is undefined.');
      }
    }
  };

  return (
    <div className='chat-container'>
      <div className='chat-window'>
        {messages.map((message, index) => (
          <div key={`${message.sender}-${index}`} className={`message ${message.sender}`}>
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






