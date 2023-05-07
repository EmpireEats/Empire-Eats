import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createUserInteractionAsync = createAsyncThunk(
  'userInteraction/add',
  async ({ postId, postAuthorId, loggedInUserId }) => {
    try {
      const token = window.localStorage.getItem('token');
      const response = await axios.post(
        '/api/userInteractions/add',
        { postId, postAuthorId, loggedInUserId },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error('error adding user interaction', error);
    }
  }
);
