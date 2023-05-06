import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';
import yerrrChatReducer from '../reducers/yerrrChatReducers';
import postReducer from '../reducers/postReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    yerrrChat: yerrrChatReducer,
    post: postReducer,
  },
});

export default store;
