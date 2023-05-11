import { createSlice } from '@reduxjs/toolkit';
import { fetchLeaderboard } from '../actions/leaderboardActions';

const initialState = {
  leaderboard: [],
  loading: false,
  error: null
};

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.leaderboard = action.payload.map((user) => ({
          name: user.username,
          restaurantVisitCount: user.reviewsCount
        }));
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default leaderboardSlice.reducer;
