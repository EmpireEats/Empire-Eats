const express = require("express");
const router = express.Router();
const Leaderboard = require("../db/models/Leaderboard");
const Review = require("../db/models/Review");

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


// GET /api/leaderboard/reviews
// router.get("/reviews", async (req, res) => {
//   try {
//     const reviews = await Review.getRecentReviews();
//     res.json(reviews);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


module.exports = router;
