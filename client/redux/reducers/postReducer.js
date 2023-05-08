import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllPostsAsync,
  addPostAsync,
  deletePostAsync,
} from '../actions/postActions';

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    allPosts: [],
    singleUsersPosts: [],
  },
  reducers: {
    addPost: (state, action) => {
      state.allPosts.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPostsAsync.fulfilled, (state, action) => {
        state.allPosts = action.payload;
      })
      .addCase(addPostAsync.fulfilled, (state, action) => {
        state.allPosts.push(action.payload);
      })
      .addCase(deletePostAsync.fulfilled, (state, action) => {
        const postId = action.payload.id;
        const findPostIndex = state.allPosts.findIndex(
          (post) => post.id === postId
        );
        state.allPosts.splice(findPostIndex, 1);
      .addCase(addPostAsync.rejected, (state, action) => {
        console.error('error adding post', action.error);
      });
  },
});

export const { addPost } = postSlice.actions;

export default postSlice.reducer;

