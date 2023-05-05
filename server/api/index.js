const { route } = require('./users');

const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/authentication/auth', require('./authentication/auth'));
router.use('/posts', require('./posts'));
router.use('/restaurants', require('./restaurants'));
router.use('/reviews', require('./reviews'));

router.use(function (req, res, next) {
  const err = new Error('Cannot find API route!');
  err.status = 404;
  next(err);
});

module.exports = router;
