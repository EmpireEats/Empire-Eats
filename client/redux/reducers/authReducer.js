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
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.status = 'succeeded';
        state.user = action.payload.user;
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
        } else {
          state.token = null;
          state.status = 'idle';
          state.user = null;
        }
      })

      .addCase(getLoggedInUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
