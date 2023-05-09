const express = require('express');
const router = express.Router();
const Leaderboard = require('../db/models/Leaderboard');

// GET /api/leaderboard
router.get('/', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.getLeaderboard();
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/leaderboard/update
router.put('/update', async (req, res) => {
  const userData = req.body;
  try {
    await Leaderboard.updateUserRankings(userData);
    res.status(200).json({ message: 'User rankings updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/leaderboard/reviews
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.getRecentReviews();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get recent photos
router.get('/photos', async (req, res) => {
  try {
    const photos = await Photo.getRecentPhotos();
    res.json(photos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;






