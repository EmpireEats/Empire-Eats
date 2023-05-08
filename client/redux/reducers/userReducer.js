import { createSlice } from '@reduxjs/toolkit';
import { fetchAllUsers, fetchSingleUser, updateUser } from '../actions/userActions';

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
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.allUsers = state.allUsers.filter(
                (user) => user.id !== action.payload
                );
        });
    },
});

export default userSlice.reducer;