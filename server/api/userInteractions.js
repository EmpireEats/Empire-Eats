const router = require('express').Router();
const UserInteraction = require('../db/models/UserInteraction');
const {
  requireAuth,
  requireUserMatch,
} = require('./authentication/authMiddleware');

router.get('/', async (req, res, next) => {
  try {
    const allUserInteractions = await UserInteraction.findAll();
    res.send(allUserInteractions);
  } catch (error) {
    console.error('error fetching all userInteractions', error);
    next(error);
  }
});

router.post('/add', requireAuth, async (req, res, next) => {
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
