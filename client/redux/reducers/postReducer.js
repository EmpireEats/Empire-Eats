import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllPostsAsync,
  addPostAsync,
  deletePostAsync,
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
      });
  },
});

export default postSlice.reducer;
