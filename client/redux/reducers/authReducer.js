import { createSlice } from '@reduxjs/toolkit';
import {
  login,
  signup,
  logout,
  getLoggedInUserData,
} from '../actions/authActions';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    status: 'idle',
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.status = 'idle';
        state.user = action.payload.user;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.status = 'idle';
        state.user = action.payload.user;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.status = 'idle';
        state.user = null;
      })
      .addCase(getLoggedInUserData.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.status = 'idle';
        state.user = action.payload.user;
      });
  },
});

export default authSlice.reducer;
