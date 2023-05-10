const express = require('express');
const router = express.Router();
const Feed = require('../db/models/Feed');

router.get('/recent', async (req, res) => {
  try {
    const feedData = await Feed.getRecentFeedData();
    res.json(feedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
