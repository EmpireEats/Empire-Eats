import { createSlice } from '@reduxjs/toolkit';
import { addReviewAsync } from '../actions/reviewActions';

const initialState = {
  allReviews: [],
  singleReview: {}
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addReviewAsync.fulfilled, (state, action) => {
        state.allReviews.push(action.payload)
      })
  }
});

export default reviewSlice.reducer;