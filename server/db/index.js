const User = require('./models/User');
const Review = require('./models/Review');
const Post = require('./models/Post');
const Restaurant = require('./models/Restaurant');
const db = require('./db');


User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

Restaurant.hasMany(Review);
Review.belongsTo(Restaurant);

module.exports = {
  User,
  Restaurant,
  Review,
  Post,
};
