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

export const fetchRestaurants = createAsyncThunk('Restaurants/fetchRestaurants', async () => {
  try {
    const { latitude, longitude } = await getGeolocation();
    const { data } = await axios.get(`/api/restaurants?latitude=${latitude}&longitude=${longitude}`);
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

// export const fetchRestaurantsInBounds = createAsyncThunk(
//   'restaurants/fetchInBounds',
//   async (bounds) => {
//     const northEast = bounds.getNorthEast();
//     const southWest = bounds.getSouthWest();

//     const { data: restaurants } = await axios.get(
//       `/api/restaurants?northEastLat=${northEast.lat()}&northEastLng=${northEast.lng()}&southWestLat=${southWest.lat()}&southWestLng=${southWest.lng()}`
//     );

//     return restaurants;
//   }
// );