import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for fetching posts from the server
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    console.log("fetchPosts called");
  const response = await axios.get("/api/posts");
  console.log("Response data:", response.data);
  return response.data;
});

// Thunk for posting a new post to the server
export const postPost = createAsyncThunk("posts/postPost", async (post) => {
    console.log("postPost called with post:", post);
  const response = await axios.post("/api/posts", post);
  console.log("Response data:", response.data);
  return response.data;
});