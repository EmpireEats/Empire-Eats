import { createSlice } from '@reduxjs/toolkit';
import { fetchRestaurants, fetchSingleRestaurant } from '../actions/restaurantActions';

const initialState = {
  allRestaurants: [],
  singleRestaurant: {},
  status: 'idle',
  error: 'null',
  nycBounds: {
    north: 40.917577,
    south: 40.477399,
    east: -73.700272,
    west: -74.259090,
  },
};

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allRestaurants = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchSingleRestaurant.fulfilled, (state, action) => {
        state.singleRestaurant = action.payload;
      });
  },
});

export default restaurantSlice.reducer;