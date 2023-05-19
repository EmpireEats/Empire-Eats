import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllPostsAsync = createAsyncThunk(
  'posts/fetchAll',
  async () => {
    try {
      const response = await axios.get('/api/posts');
      return response.data;
    } catch (error) {
      console.error('error fetching all posts', error);
    }
  }
);

export const fetchHiddenPosts = createAsyncThunk(
  'post/fetchHiddenPosts',
  async (userId, thunkAPI) => {
    try {
      if (!userId) {
        return thunkAPI.rejectWithValue('User is not logged in');
      }
      const token = window.localStorage.getItem('token');
      const response = await axios.get(`/api/posts/hidden/${userId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('error fetching hidden posts', error);
    }
  }
);

export const hidePostAsync = createAsyncThunk(
  'post/hideOne',
  async ({ postId, userId }) => {
    try {
      const token = window.localStorage.getItem('token');
      const response = await axios.put(
        `/api/posts/${userId}/hide/${postId}`,
        { postId, userId },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('error hiding post front-end', error);
    }
  }
);

export const fetchPostForChat = createAsyncThunk(
  'post/findForChat',
  async (postId) => {
    try {
      const token = window.localStorage.getItem('token');
      const response = await axios.get(`/api/posts/${postId}/chat`, {
        headers: { authorization: `Bearer ${token}` },
      });
      console.log('3. response data in thunk: ', response.data);
      return response.data;
    } catch (error) {
      console.error('error fetching post for chat', error);
    }
  }
);
