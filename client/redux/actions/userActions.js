import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllUsers = createAsyncThunk('users/fetchAll', async () => {
    try {
        const { data } = await axios.get('/api/users/all');
        return data;
    } catch (err) {
        return err.message;
    }
});

export const fetchSingleUser = createAsyncThunk('users/fetchSingle', async (id) => {
    try {
        const { data } = await axios.get(`/api/users/${id}`);
        return data;
    } catch (err) {
        return err.message;
    }
});

export const updateUser = createAsyncThunk('users/update', async ({ id, firstName, lastName, email, username, password }) => {
    try {
        const { data } = await axios.put(`api/users/${id}`, {
            firstName,
            lastName,
            email,
            username,
            password,
        });
        return data;
    } catch (err) {
        return err.message;
    }
});