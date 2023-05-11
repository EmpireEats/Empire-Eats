import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addReviewAsync = createAsyncThunk('reviews/addReview', async (reviewData, { rejectWithValue }) => {
  const token = window.localStorage.getItem("token");
  try {
    if (token) {
      const { data } = await axios.post('/api/reviews', reviewData, {
        headers: {
          authorization: token,
        },
      });
      return data;
    } else {
      return rejectWithValue('No token found');
    }
  } catch (err) {
    return rejectWithValue(err.message);
  }
});