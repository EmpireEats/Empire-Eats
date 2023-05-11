import { createSlice } from '@reduxjs/toolkit';
import { fetchRestaurants, fetchSingleRestaurant, fetchRestaurantsInBounds } from '../actions/restaurantActions';

const initialState = {
  allRestaurants: [],
  singleRestaurant: {},
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
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.allRestaurants = action.payload
      })
      .addCase(fetchSingleRestaurant.fulfilled, (state, action) => {
        state.singleRestaurant = action.payload
      })
      .addCase(fetchRestaurantsInBounds.fulfilled, (state, action) => {
        state.allRestaurants = action.payload;
      });
  }
});

export default restaurantSlice.reducer;