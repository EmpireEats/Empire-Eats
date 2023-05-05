import {createSlice} from "@reduxjs/toolkit"
import { sendMessage } from "../actions/yerrrChatActions";


const yerrrChatSlice = createSlice({
    name: "yerrrChat",
    initialState: {
      messages: [],
      status: "idle",
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(sendMessage.pending, (state) => {
          state.status = "loading";
        })
        .addCase(sendMessage.fulfilled, (state, action) => {
            console.log(action.payload);
          state.status = "idle";
          state.messages.push(action.payload);
        })
        .addCase(sendMessage.rejected, (state, action) => {
          state.status = "idle";
          state.error = action.payload;
        });
    },
  });
  
  export default yerrrChatSlice.reducer;