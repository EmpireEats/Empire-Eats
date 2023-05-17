const router = require('express').Router();
const Review = require('../db/models/Review');
const { requireAuth } = require('./authentication/authMiddleware');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ dest: 'uploads/' });

// // this route works without cloudinary & implementing image url
// router.post('/', requireAuth, async (req, res, next) => {
//   const { placeId, name, address, body, image } = req.body;
//   const userId = req.user.id;
//   try {
//     const newReview = await Review.create({ userId, placeId, name, address, body, image });
//     res.status(201).json({ message: 'Review created successfully', review: newReview });
//   } catch (error) {
//     res.status(400).json({ error: 'Failed to create review' });
//   }
// });

// test route, get all reviews
router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// get all pics for a specific restaurant
router.get('/:placeId', requireAuth, async (req, res, next) => {
  const { placeId } = req.params;
  try {
    const reviews = await Review.findAll({ where: { placeId } });
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

//testing with cloudinary
router.post('/', requireAuth, upload.single('image'), async (req, res, next) => {
  const { placeId, name, address, body } = req.body;
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
    const newReview = await Review.create({
      userId,
      placeId,
      name,
      address,
      body,
      image: imageUrl,
    });
    res.status(201).json({ message: 'Review created successfully', review: newReview });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create review' });
  }
});

module.exports = router;