import { createSlice } from '@reduxjs/toolkit';
import { fetchUsername } from '../actions/userActions';

const initialState = {
    user: {},
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
         builder
            .addCase(fetchUsername.fulfilled, (state, action) => {
            state.user = action.payload.user;
            });
    },
});

export default userSlice.reducer;
