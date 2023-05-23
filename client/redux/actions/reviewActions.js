import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addReviewAsync = createAsyncThunk('reviews/addReview', async (reviewData, { rejectWithValue }) => {
  const token = window.localStorage.getItem("token");

  const formData = new FormData();
  formData.append('placeId', reviewData.placeId);
  formData.append('name', reviewData.name);
  formData.append('address', reviewData.address);
  formData.append('body', reviewData.body);
  formData.append('image', reviewData.image);

  try {
    if (token) {
      const { data } = await axios.post('/api/reviews', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${token}`,
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

export const fetchReviewsByPlaceAsync = createAsyncThunk(
  'reviews/fetchByPlaceId',
  async ({ placeId, page = 1, limit = 20 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/reviews/${placeId}?page=${page}&limit=${limit}`);
      const { reviews, count } = response.data;
      return { reviews, count };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteReviewByUserAsync = createAsyncThunk(
  'reviews/deleteReview',
  async (id, { rejectWithValue }) => {
    const token = window.localStorage.getItem("token");
    try {
      if (token) {
        const { data } = await axios.delete(`/api/reviews/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        return data;
      }
    } catch (error) {
      return rejectWithValue('Failed to delete the review');
    }
  }
);
