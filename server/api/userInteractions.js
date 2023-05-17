const router = require('express').Router();
const UserInteraction = require('../db/models/UserInteraction');
const {
  requireAuth,
  requireUserMatch,
} = require('./authentication/authMiddleware');

router.post('/add', requireAuth, requireUserMatch, async (req, res, next) => {
  try {
    const { postId, postAuthorId, loggedInUserId } = req.body;
    const addUserInteraction = await UserInteraction.create({
      postId,
      postAuthorId,
      interactingUserId: loggedInUserId,
      isActive: true,
    });
    res.send(addUserInteraction);
  } catch (error) {
    console.error('error adding user interaction', error);
    next(error);
  }
});

module.exports = router;
