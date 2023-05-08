import { createSlice } from '@reduxjs/toolkit';
import { fetchRestaurants, fetchSingleRestaurant } from '../actions/restaurantActions';

const initialState = {
  allRestaurants: [],
  singleRestaurant: {},
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
  }
});

export default restaurantSlice.reducer;