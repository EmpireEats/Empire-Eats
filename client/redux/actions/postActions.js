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

export const addPost = (post) => ({
  type: 'post/addOne',
  payload: post,
});

export const addPostAsync = createAsyncThunk(
  'posts/addOne',
  async ({ text, sortingOptions }) => {
    try {
      const token = window.localStorage.getItem('token');
      const response = await axios.post(
        '/api/posts/add',
        {
          text,
          sortingOptions,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 409) {
        throw new Error(response.data.error);
      }

      return response.data;
    } catch (error) {
      console.error('error adding post', error);
      alert(
        'You already have an active post! Please delete active post and try again.'
      );
      throw error;
    }
  }
);
export const deletePostAsync = createAsyncThunk(
    'post/deleteOne',
    async ({ id, loggedInUserId }) => {
      try {
        const token = window.localStorage.getItem('token');
        const response = await axios.delete(
          `/api/posts/${id}/${loggedInUserId}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error('error deleting users post', error);
      }
    }
  );


