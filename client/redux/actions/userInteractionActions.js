import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const findActiveUserInteraction = createAsyncThunk(
  'userInteraction/findActive',
  async (id) => {
    try {
      const token = window.localStorage.getItem('token');
      const response = await axios.get(`/api/userInteractions/${id}/active`, {
        headers: { authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('error finding user interaction', error);
    }
  }
);
