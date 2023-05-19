import { createSlice } from '@reduxjs/toolkit';
import { addReviewAsync, fetchReviewsByPlaceAsync } from '../actions/reviewActions';

const initialState = {
  allReviews: [],
  singleReview: {},
  status: 'idle',
  error: null,
  totalReviewsCount: 0,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: { 
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
        action.payload.reviews.forEach(review => {
          if (!state.allReviews.find(r => r.id === review.id)) {
            state.allReviews.push(review);
          }
        });
        state.totalReviewsCount = action.payload.count;
      })          
      .addCase(fetchReviewsByPlaceAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }  
});

export default reviewSlice.reducer;