import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';
import yerrrChatReducer from '../reducers/yerrrChatReducers';

const store = configureStore({
  reducer: {
    auth: authReducer,
    yerrrChat: yerrrChatReducer, 
  },
});

export default store;
