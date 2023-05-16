import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllPostsAsync,
  addPostAsync,
  deletePostAsync,
  hidePostAsync,
  fetchHiddenPosts,
} from '../actions/postActions';

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    allPosts: [],
    hiddenPosts: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPostsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPostsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.allPosts = action.payload;
      })
      .addCase(addPostAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPostAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.allPosts.push(action.payload);
      })
      .addCase(deletePostAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePostAsync.fulfilled, (state, action) => {
        state.loading = false;
        const postId = action.payload.id;
        const findPostIndex = state.allPosts.findIndex(
          (post) => post.id === postId
        );
        state.allPosts.splice(findPostIndex, 1);
      })
      .addCase(addPostAsync.rejected, (state, action) => {
        state.loading = false;
        console.error('error adding post', action.error);
      })
      .addCase(hidePostAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(hidePostAsync.fulfilled, (state, action) => {
        state.loading = false;
        const postId = action.payload.postId;
        state.hiddenPosts.push(postId);
      })
      .addCase(fetchHiddenPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHiddenPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.hiddenPosts = action.payload.map((post) => post.postId);
      })
      .addCase(fetchHiddenPosts.rejected, (state, action) => {
        state.loading = false;
        console.error('Error fetching hidden posts', action.error);
      });
  },
});

export default postSlice.reducer;
