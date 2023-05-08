import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRestaurants = createAsyncThunk('Restaurants', async () => {
  try {
    const { data } = await axios.get('/api/restaurants');
    return data
  } catch (err) {
    return(err)
  }
});

export const fetchSingleRestaurant = createAsyncThunk('singleRestaurant', async (id) => {
  try {
    const { data } = await axios.get(`/api/restaurants/${id}`);
    return data
  } catch (err) {
    return(err)
  }
});