import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllPostsAsync,
  addPostAsync,
  deletePostAsync,
  updatePostAsync,
  hidePostAsync,
} from '../actions/postActions';
import { fetchChatMembersIdAsync } from '../actions/userInteractionActions';

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    allPosts: [],
    singleUsersPosts: [],
    chatMemberIds: [],
    hiddenPosts: [],
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
      });
    // .addCase(hidePostAsync.fulfilled, (state,action) => {
    //   const postId= action.payload.postId
    //   state.hiddenPosts.push(action.payload)
    //   const findIndex =
    // })
  },
});

export default postSlice.reducer;
