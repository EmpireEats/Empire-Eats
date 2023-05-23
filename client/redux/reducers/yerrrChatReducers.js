import { createSlice } from '@reduxjs/toolkit';
import { receiveMessage } from '../actions/yerrrChatActions';

const yerrrChatSlice = createSlice({
  name: 'yerrrChat',
  initialState: {
    messages: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(receiveMessage, (state, action) => {
      state.messages.push(action.payload);
    });
  },
});

export default yerrrChatSlice.reducer;
