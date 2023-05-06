import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Mock API request for sending messages
const sendMessageAPI = async (message) => {
    const response = await axios.post("/api/chat/messages", message);
    return response.data;
  };

export const sendMessage = createAsyncThunk(
  "yerrrChat/sendMessage",
  async (message, { rejectWithValue }) => {
    try {
      const response = await sendMessageAPI(message);
      console.log("Message sent successfully:", response);
      return response;
    } catch (error) {
        return rejectWithValue(error.message);
    }
  }
);