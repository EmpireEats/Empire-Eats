const router = require('express').Router();
const { User, Post, Review } = require('../db/index');
const {
  requireAuth,
  requireUserMatch,
} = require('./authentication/authMiddleware');

router.get('/', async (req, res, next) => {
  try {
    const getAllPosts = await Post.findAll({ include: User });
    res.send(getAllPosts);
  } catch (error) {
    console.error('error fetching all posts', error);
    next(error);
  }
});

router.get('/:id', requireAuth, requireUserMatch, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    const getUsersPosts = await Post.findAll({ where: { userId: user.id } });
    res.send(getUsersPosts);
  } catch (error) {
    console.error('error fetching users yerrr posts', error);
    next(error);
  }
});

router.post('/add', requireAuth, async (req, res, next) => {
  try {
    const user = req.user;
    const { text, sortingOptions } = req.body;
    const findActivePost = await Post.findOne({
      where: { userId: user.id, isActive: true },
    });
    console.log('active post:', findActivePost);
    if (!findActivePost) {
      const newPost = await Post.create({
        text,
        preference: sortingOptions,
        isActive: true,
        userId: user.id,
      });
      res.send(newPost);
    } else {
      res.status(409).json({ error: 'User already has an active post.' });
    }
  } catch (error) {
    console.error('error adding post', error);
    next(error);
  }
});

module.exports = router;

