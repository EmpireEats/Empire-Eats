import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllPostsAsync,
  hidePostAsync,
  fetchHiddenPosts,
  fetchPostForChat,
} from '../actions/postActions';

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    allPosts: [],
    hiddenPosts: [],
    loading: false,
    activePostForChat: null,
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
      .addCase(hidePostAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(hidePostAsync.fulfilled, (state, action) => {
        state.loading = false;
        const postId = action.payload.id;
        state.hiddenPosts.push(postId);
      })
      .addCase(fetchHiddenPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHiddenPosts.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.hiddenPosts = action.payload.map((post) => post.postId);
        }
      })

      .addCase(fetchHiddenPosts.rejected, (state, action) => {
        state.loading = false;
        console.error('Error fetching hidden posts', action.error);
      })
      .addCase(fetchPostForChat.fulfilled, (state, action) => {
        state.loading = false;
        state.activePostForChat = action.payload;
      })
      .addCase(fetchPostForChat.pending, (state) => {
        state.loading = true;
      });
  },
});

export default postSlice.reducer;
