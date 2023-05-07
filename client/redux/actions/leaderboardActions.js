
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLeaderboard = createAsyncThunk(
  'leaderboard/fetchLeaderboard',
  async () => {
    const response = await axios.get('/api/leaderboard');
    return response.data;
  }
);

// export const fetchLeaderboardByBadge? - need to verify if we want this or not.
// we probably should have this for users that want to see the leaderboard for a specific badge.