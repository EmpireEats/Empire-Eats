import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLeaderboard = createAsyncThunk(
  "leaderboard/fetchLeaderboard",
  async () => {
    const response = await axios.get("/api/leaderboard");
    return response.data;
  }
);

