const router = require('express').Router();
const { User, Post, Review } = require('../db/index');
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

router.get('/:id', requireAuth, requireUserMatch, async (req, res, next) => {
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

module.exports = router;
