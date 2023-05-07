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

export const addPostAsync = createAsyncThunk(
  'posts/addOne',
  async ({ text, sortingOptions }) => {
    try {
      const response = await axios.post('/api/posts/add', {
        text,
        sortingOptions,
      });
      return response.data;
    } catch (error) {
      console.error('error adding post', error);
    }
  }
);
