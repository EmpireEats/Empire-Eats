const router = require('express').Router();
const User = require('../db/models/User');
const Review = require('../db/models/Review')
const {
  requireAuth,
  requireUserMatch,
} = require('./authentication/authMiddleware');
const adminAuth = require('./authentication/adminAuth');
const multer = require('multer');const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ dest: 'uploads/' });

router.get('/all', adminAuth, async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    res.send(allUsers);
  } catch (error) {
    console.error('error getting users');
    next(error);
  }
});

router.get('/:id', requireAuth, requireUserMatch, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [Review],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (req.user.id !== user.id) {
      return res.status(403).json({ error: 'Access denied. Not your data.' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error getting user data', error);
    next(error);
  }
});

router.get('/username/:username', requireAuth, async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({
      where: { username },
      include: [Review],
      attributes: {
        exclude: ['id', 'firstName', 'lastName', 'email', 'password', 'isAdmin', 'createdAt', 'updatedAt']
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error getting user data', error);
    next(error);
  }
});

router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (req.user.id !== user.id) {
      return res.status(403).json({ error: 'Access denied. Not your data.' });
    }

    Object.assign(user, req.body);

    await user.save();

    res.json(user);
  } catch (error) {
    console.error('Error updating user data', error);
    next(error);
  }
});

router.post('/:id', requireAuth, async (req, res, next) => {('image'), async (req, res, next) => {
  const userId = req.user.id;

  if (!req.file) {
    return res.status(400).json({ error: 'Image is required' });
  }

  let imageUrl = null;
  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    } catch (error) {
      return res.status(500).json({ error: 'Failed to upload image' });
    }
  }

    try {
      const newPicture = await Review.create({
        image: imageUrl,
      });
      res.status(201).json({ message: 'Photo created successfully', review: newReview });
    } catch (error) {
      res.status(400).json({ error: 'Failed to upload photo' });
    }
  }
});

module.exports = router;
