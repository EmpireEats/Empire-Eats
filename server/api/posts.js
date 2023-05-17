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

router.get('/:id', requireAuth, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    const getUsersPosts = await Post.findAll({ where: { userId: user.id } });
    res.send(getUsersPosts);
  } catch (error) {
    console.error('error fetching users yerrr posts', error);
    next(error);
  }
});

router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const postData = req.body;
    const postToUpdate = await Post.findByPk(req.params.id);
    const updatedPost = await postToUpdate.update(postData);
    console.log('updated post in server: ', updatedPost);
    updatedPost.save();
    res.send(updatedPost);
  } catch (error) {
    console.error('error updating post', error);
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
