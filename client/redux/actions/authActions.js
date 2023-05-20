import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getGeolocation } from './restaurantActions';

// Auth Actions
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/authentication/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return response.data;
    } catch (error) {
      let errorMessage = 'An error occurred during login. Please try again.';

      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || errorMessage;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async ({
    firstName,
    lastName,
    email,
    username,
    password,
    image,
  }) => {
    try {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('username', username);
      formData.append('password', password);
      formData.append('image', image);

      const response = await axios.post('/api/authentication/auth/signup', formData);
    
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return response.data;
    } catch (error) {
      console.error('Error signing up user', error);
      throw error;
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await axios.post('/api/authentication/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Error logging out user', error);
    throw error;
  }
});

// export const getLoggedInUserData = createAsyncThunk(
//   'auth/getLoggedInUserData',
//   async () => {
//     try {
//       const storedToken = localStorage.getItem('token');
//       const storedUser = JSON.parse(localStorage.getItem('user'));

//       if (storedToken && storedUser) {
//         return { token: storedToken, user: storedUser };
//       } else {
//         return null;
//       }
//     } catch (error) {
//       console.error('Error getting logged-in user data', error);
//       throw error;
//     }
//   }
// );

// TESTING RETRIEVING A LOGGED IN USERS DATA WITH COODINATES
export const getLoggedInUserData = createAsyncThunk(
  'auth/getLoggedInUserData',
  async () => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser = JSON.parse(localStorage.getItem('user'));

      let location;

      if (navigator.geolocation && storedToken && storedUser) {
        try {
          const position = await getGeolocation();
          // Only use the serializable parts of the position object
          location = {
            latitude: position.latitude,
            longitude: position.longitude
          };
        } catch (error) {
          console.warn('Error getting user geolocation', error);
          // Set default location if geolocation is not found
          location = {
            latitude: 40.7128,
            longitude: -74.0060
          };
        }
      } 

      // Return user data with location (either retrieved or default)
      if (storedToken && storedUser) {
        return { 
          token: storedToken, 
          user: storedUser,
          location
        };
      }

      // if no storedToken and storedUser, return null
      return null;
      
    } catch (error) {
      console.error('Error getting logged-in user data', error);
      throw error;
    }
  }
);

// User Actions
export const fetchAllUsers = createAsyncThunk('users/fetchAll', async () => {
    try {
        const token = window.localStorage.getItem('token');
        const { data } = await axios.get('/api/users/all', 
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );
        return data;
    } catch (err) {
        return err.message;
    }
});

export const fetchSingleUser = createAsyncThunk('users/fetchSingle', async ({ id, username }) => {
  try {
        const token = window.localStorage.getItem('token');
        const route = username? `/api/users/profile/${username}` : `/api/users/${id}` ;
        const { data } = await axios.get(route, 
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );
        const reviews = data.Reviews || [];

        return { user: data, reviews };

    } catch (err) {
        return err.message;
    }
});

export const editUser = createAsyncThunk('users/update', async ({ id, firstName, lastName, email, username, password }) => {
    try {
        const token = window.localStorage.getItem('token');
        const { data } = await axios.put(`/api/users/${id}`, 
            {
                firstName,
                lastName,
                email,
                username,
                password,
            }, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
        });
        return data;
    } catch (err) {
        return err.message;
    }
});
