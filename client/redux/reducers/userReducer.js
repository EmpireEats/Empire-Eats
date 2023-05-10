import { createSlice } from '@reduxjs/toolkit';
import { fetchAllUsers, fetchSingleUser, editUser } from '../actions/userActions';

const initialState = {
    allUsers: [],
    singleUser: {},
};

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.allUsers = action.payload;
        });
        builder.addCase(fetchSingleUser.fulfilled, (state, action) => {
            state.singleUser = action.payload;
        });
        builder.addCase(editUser.fulfilled, (state, action) => {
            state.singleUser = action.payload;
        });
    },
});

export default userSlice.reducer;