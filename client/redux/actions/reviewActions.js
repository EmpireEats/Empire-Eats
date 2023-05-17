import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// export const addReviewAsync = createAsyncThunk('reviews/addReview', async (reviewData, { rejectWithValue }) => {
//   const token = window.localStorage.getItem("token");
//   try {
//     if (token) {
//       const { data } = await axios.post('/api/reviews', reviewData, {
//         headers: {
//           // 'Content-Type': 'multipart/form-data',
//           authorization: `Bearer ${token}`,
//         },
//       });
//       return data;
//     } else {
//       return rejectWithValue('No token found');
//     }
//   } catch (err) {
//     return rejectWithValue(err.message);
//   }
// });

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

// fetch all reviews testing
export const fetchReviewsAsync = createAsyncThunk('reviews/fetchReviews', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/api/reviews');
    return data.reviews;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

//fetch all reviews for specific restaurant
export const fetchReviewsByPlaceAsync = createAsyncThunk('reviews/fetchReviewsByPlace', async (placeId, { rejectWithValue }) => {
  const token = window.localStorage.getItem("token");
  try {
    const { data } = await axios.get(`/api/reviews/${placeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return data.reviews;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});