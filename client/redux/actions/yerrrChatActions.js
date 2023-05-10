import { createAction } from '@reduxjs/toolkit';

export const updateChatMessages = (messages) => ({
    type: 'UPDATE_CHAT_MESSAGES',
    payload: messages,
  });
  

export const receiveMessage = createAction('/yerrr/chat/receiveMessage');
