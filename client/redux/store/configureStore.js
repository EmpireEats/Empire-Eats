import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';
import yerrrChatReducer from '../reducers/yerrrChatReducers';
import leaderboardReducer from '../reducers/leaderboardReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    yerrrChat: yerrrChatReducer,
    leaderboard: leaderboardReducer, 
  },
});

export default store;
