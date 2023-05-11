import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';
import yerrrChatReducer from '../reducers/yerrrChatReducers';
import postReducer from '../reducers/postReducer';
import leaderboardReducer from '../reducers/leaderboardReducer';
import userReducer from '../reducers/userReducer';
import restaurantReducer from '../reducers/restaurantReducer';
import feedReducer from '../reducers/feedReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    yerrrChat: yerrrChatReducer,
    post: postReducer,
    leaderboard: leaderboardReducer, 
    user: userReducer,
    restaurant: restaurantReducer,
    feed: feedReducer,
  },
});

export default store;