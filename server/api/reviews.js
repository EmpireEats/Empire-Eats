const router = require('express').Router();
const Review = require('../db/models/Review');
const { requireAuth } = require('./authentication/authMiddleware');

router.post('/', requireAuth, async (req, res, next) => {
  const { placeId, rating, body } = req.body;
  const userId = req.user.id;
  try {
    const newReview = await Review.create({ userId, placeId, rating, body });
    res.status(201).json({ message: 'Review created successfully', review: newReview });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create review' });
  }
});

module.exports = router;