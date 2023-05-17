const router = require('express').Router();
const { User, Post, HiddenPost } = require('../db/index');
const {
  requireAuth,
  requireUserMatch,
} = require('./authentication/authMiddleware');

router.get('/', async (req, res, next) => {
  try {
    const getAllPosts = await Post.findAll({
      include: User,
      order: [['createdAt', 'DESC']],
    });
    res.send(getAllPosts);
  } catch (error) {
    console.error('error fetching all posts', error);
    next(error);
  }
});

router.get(
  '/hidden/:id',
  requireAuth,
  requireUserMatch,
  async (req, res, next) => {
    try {
      const getHiddenPosts = await HiddenPost.findAll({
        where: { userId: req.params.id },
      });
      console.log('hidden posts: ', getHiddenPosts);
      res.send(getHiddenPosts);
    } catch (error) {
      console.error('error fetching users hidden posts', error);
      next(error);
    }
  }
);

router.put(
  '/:id/hide/:postId',
  requireAuth,
  requireUserMatch,
  async (req, res, next) => {
    try {
      const userId = req.params.id;
      const postToHide = req.params.postId;
      const hiddenPost = await HiddenPost.create({
        postId: postToHide,
        userId: userId,
      });
      res.send(hiddenPost);
    } catch (error) {
      console.error('error hiding post', error);
      next(error);
    }
  }
);

module.exports = router;
