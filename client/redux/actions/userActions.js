import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsername = createAsyncThunk('users/fetchUsername', async (username, { rejectWithValue }) => {
  try {
        const token = window.localStorage.getItem('token');
        const { data } = await axios.get(`/api/users/profile/${username}`, 
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );

        return { user: data };

    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});
