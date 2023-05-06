import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';
import yerrrChatReducer from '../reducers/yerrrChatReducers';
import postsReducer from "../reducers/postReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    yerrrChat: yerrrChatReducer, 
    posts: postsReducer,
    
  },
});

export default store;
