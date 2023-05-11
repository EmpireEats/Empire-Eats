const express = require("express");
const router = express.Router();
const Leaderboard = require("../db/models/Leaderboard");

// GET /api/leaderboard
router.get("/", async (req, res) => {
  try {
    const leaderboard = await Leaderboard.getLeaderboard();
    res.json(leaderboard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
