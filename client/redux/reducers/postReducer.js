import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts, postPost } from "../actions/postActions";

const postsSlice = createSlice({
    name: "posts",
    initialState: { items: [], status: "idle", error: null },
    reducers: {},
    extraReducers: (builder) => {
      // Handle fetchPosts
      builder
        .addCase(fetchPosts.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.items = action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        });
      // Handle postPost
      builder.addCase(postPost.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
    },
  });
  
  export default postsSlice.reducer;
