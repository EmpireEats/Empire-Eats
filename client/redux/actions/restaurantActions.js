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

const roundTo = (number, decimalPlaces) => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(number * factor) / factor;
};

// // USE THIS FUNCTION AFTER DEMO DAY, THIS ONE WILL ONLY RETRIEVE RESTAURANTS BASED ON FOUND COORINDATES
// export const fetchRestaurants = createAsyncThunk('Restaurants/fetchRestaurants', async (_, { getState }) => {
//   try {
//     const { latitude, longitude } = await getGeolocation();
//     const { nextPageToken } = getState().restaurant;
//     const url = `/api/restaurants?latitude=${latitude}&longitude=${longitude}&pageToken=${nextPageToken || ''}`;
//     const { data } = await axios.get(url);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// });


// REMOVE THIS FUNCTION AFTER DEMO DAY, THIS IS GIVING DEFAULT COORDINATES TO USERS WHOS LOCATION CANT BE FOUND
export const fetchRestaurants = createAsyncThunk('Restaurants/fetchRestaurants', async (_, { getState }) => {
  try {
    let latitude;
    let longitude;

    try {
      const { latitude: userLatitude, longitude: userLongitude } = await getGeolocation();
      // Round the latitude and longitude values
      latitude = roundTo(userLatitude, 4);
      longitude = roundTo(userLongitude, 4);
    } catch (error) {
      // Default coordinates to the center of NYC
      latitude = 40.7128;
      longitude = -74.0060;
    }

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