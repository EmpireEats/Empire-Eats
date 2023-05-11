import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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

export const fetchSingleUser = createAsyncThunk('users/fetchSingle', async (id) => {
  try {
        const token = window.localStorage.getItem('token');
        const { data } = await axios.get(`/api/users/${id}`, 
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
