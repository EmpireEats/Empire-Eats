const router = require('express').Router();
const Review = require('../db/models/Review');
const { requireAuth, requireUserMatch } = require('./authentication/authMiddleware');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ dest: 'uploads/' });

router.get('/:placeId', async (req, res, next) => {
  const { placeId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;

  try {
    const reviews = await Review.findAndCountAll({ 
      where: { placeId },
      limit,
      offset
    });
    res.status(200).json({ reviews: reviews.rows, count: reviews.count });

    reviews.rows = reviews.rows.map(review => {
      const date = new Date(review.createdAt);
      return {
        ...review,
        createdAt: date.toLocaleDateString()
      }
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

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

router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (review.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized to delete this review' });
    }

    await review.destroy();
    res.json(review);
  } catch (err) {
    next(err);
  }
});

module.exports = router;