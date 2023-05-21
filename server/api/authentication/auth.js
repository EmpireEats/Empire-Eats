const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const { User, Post, Review, UserInteraction } = require('../../db/index');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ dest: 'uploads/' });

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [Post, Review, UserInteraction],
    });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, user });
  } catch (error) {
    next(error);
  }
});

router.post('/signup', upload.single('image'), async (req, res, next) => {
    const {
      firstName,
      lastName,
      email,
      username,
      password,
    } = req.body;

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
    const user = await User.create({
      firstName, 
      lastName,
      email,
      username,
      password,
      image: imageUrl,
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token, user });
  } catch (error) {
    console.error('error signing up', error);
    next(error);
  }
});

router.post('/logout', (req, res) => {
  try {
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error('error logging out', error);
    res.status(500).json({ error: 'Error logging out' });
  }
});

module.exports = router;
