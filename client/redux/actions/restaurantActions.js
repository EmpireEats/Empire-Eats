import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getGeolocation = async () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position.coords),
      error => reject(error)
    );
  });
};

export const fetchRestaurants = createAsyncThunk('Restaurants/fetchRestaurants', async (_, { getState }) => {
  try {
    const { latitude, longitude } = await getGeolocation();
    const { nextPageToken } = getState().restaurant;
    const url = `/api/restaurants?latitude=${latitude}&longitude=${longitude}&pageToken=${nextPageToken || ''}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    throw error;
  }
});

export const fetchSingleRestaurant = createAsyncThunk('singleRestaurant/fetchSingleRestaurant', async (placeId) => {
  try {
    const { data } = await axios.get(`/api/restaurants/${placeId}`);
    return data;
  } catch (error) {
    throw error;
  }
});