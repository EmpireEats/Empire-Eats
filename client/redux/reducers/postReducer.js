import { createSlice } from '@reduxjs/toolkit';
import { fetchAllPostsAsync } from '../actions/postActions';

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    allPosts: [],
    singleUsersPosts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllPostsAsync.fulfilled, (state, action) => {
      state.allPosts = action.payload;
    });
  },
});

export default postSlice.reducer;
