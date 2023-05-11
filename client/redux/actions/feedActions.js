import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFeed = createAsyncThunk(
  "feed/fetchFeed", 
  async () => {
  const response = await axios.get("/api/feed");
  return response.data;
}
);
