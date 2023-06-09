import { createSlice } from '@reduxjs/toolkit';
import {
  login,
  signup,
  logout,
  getLoggedInUserData,
  fetchAllUsers,
  fetchSingleUser,
  editUser,
} from '../actions/authActions';
import { findActiveUserInteraction } from '../actions/userInteractionActions';

const initialState = {
  token: null,
  status: 'idle',
  user: null,
  location: null, // testing
  error: null,
  allUsers: [],
  activeUserInteraction: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.location = action.payload.location; // testing
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.status = 'succeeded';
        state.user = action.payload.user;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.status = 'succeeded';
        state.user = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getLoggedInUserData.fulfilled, (state, action) => {
        if (action.payload) {
          state.token = action.payload.token;
          state.status = 'succeeded';
          state.user = action.payload.user;
          state.location = action.payload.location; //testing
        } else {
          state.token = null;
          state.status = 'idle';
          state.user = null;
          state.location = null; //testing
        }
      })
      .addCase(getLoggedInUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      })
      .addCase(fetchSingleUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(findActiveUserInteraction.fulfilled, (state, action) => {
        state.activeUserInteraction = action.payload;
      });
  },
});

export default authSlice.reducer;
