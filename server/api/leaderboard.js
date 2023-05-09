const express = require('express');
const router = express.Router();
const Leaderboard = require('../db/models/Leaderboard');


router.get('/', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.getLeaderboard();
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/update', async (req, res) => {
  const userData = req.body;
  try {
    await Leaderboard.updateUserRankings(userData);
    res.status(200).json({ message: 'User rankings updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;






