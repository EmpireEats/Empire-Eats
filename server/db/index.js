const User = require('./models/User');
const Review = require('./models/Review');
const Post = require('./models/Post');
const Restaurant = require('./models/Restaurant');
const db = require('./db');

User.hasMany(Review)
Review.belongsTo(User)
User.hasMany(Post)
Post.belongsToMany(User)
Restaurant.hasMany(Review)
Review.belongsTo(Restaurant)
Restaurant.hasMany(Post)
Post.belongsTo(Restaurant)

module.exports = { 
  db, 
  User,
  Restaurant,
  Review,
  Post
}