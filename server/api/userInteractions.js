const router = require('express').Router();
const { UserInteraction, User } = require('../db/index');
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

router.get('/:id/active', requireAuth, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    const interaction = await UserInteraction.findOne({
      where: { interactingUserId: user.id },
    });
    console.log('interaction in server', interaction);
    if (!interaction) res.status(404).send('interaction not found');
    res.send(interaction);
  } catch (error) {
    console.error('active interaction does not exist', error);
    next(error);
  }
});

module.exports = router;
