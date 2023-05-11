import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllPostsAsync,
  addPostAsync,
  deletePostAsync,
  updatePostAsync,
} from '../actions/postActions';
import { fetchChatMembersIdAsync } from '../actions/userInteractionActions';

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    allPosts: [],
    singleUsersPosts: [],
    chatMemberIds: [],
  },
  reducers: {},
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
      })
      .addCase(fetchChatMembersIdAsync.fulfilled, (state, action) => {
        console.log('Updating chat member IDs in state:', action.payload);
        state.chatMemberIds = action.payload;
      })
      .addCase(addPostAsync.rejected, (state, action) => {
        console.error('error adding post', action.error);
      })
      .addCase(updatePostAsync.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        const index = state.allPosts.findIndex(
          (post) => post.id === updatedPost.id
        );
        if (index !== -1) {
          state.allPosts[index] = updatedPost;
        }
      });
  },
});

export default postSlice.reducer;
