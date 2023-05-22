import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';
import userReducer from '../reducers/userReducer';
import yerrrChatReducer from '../reducers/yerrrChatReducers';
import postReducer from '../reducers/postReducer';
import leaderboardReducer from '../reducers/leaderboardReducer';
import restaurantReducer from '../reducers/restaurantReducer';
import feedReducer from '../reducers/feedReducer';
import reviewReducer from '../reducers/reviewReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    yerrrChat: yerrrChatReducer,
    post: postReducer,
    leaderboard: leaderboardReducer, 
    restaurant: restaurantReducer,
    feed: feedReducer,
    review: reviewReducer,
  },
});

export default store;