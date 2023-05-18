import { createSlice } from '@reduxjs/toolkit';
import { addReviewAsync, fetchReviewsByPlaceAsync } from '../actions/reviewActions';

const initialState = {
  allReviews: [],
  singleReview: {},
  totalCount: 0,
  status: 'idle',
  error: null,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    clearReviews: (state) => {
      state.allReviews = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addReviewAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addReviewAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allReviews.push(action.payload);
      })
      .addCase(addReviewAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchReviewsByPlaceAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviewsByPlaceAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allReviews = action.payload.reviews;
        state.totalCount = action.payload.count;
      })
      .addCase(fetchReviewsByPlaceAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }  
});

export const { clearReviews } = reviewSlice.actions;

export default reviewSlice.reducer;