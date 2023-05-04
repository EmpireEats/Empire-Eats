const db = require('./server/db/db');
const User = require('./server/db/models/User');
const Restaurant = require('./server/db/models/Restaurant');
const Post = require('./server/db/models/Post');
const Review = require('./server/db/models/Review');

const users = [
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'JaneDoe@example.com',
    username: 'Jane D.',
    password: 'password',
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'JohnDoe@example.com',
    username: 'John D.',
    password: 'password',
  },
];

const reviews = [
  {
    rating: 3,
    body: "hello world"
  }
]

const restaurants = [
  {
    name: 'hello',
    address: 'world'
  }
]

const posts = [
  {
    preference: 'group',
    isActive: true
  }
]

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(users.map((user) => User.create(user)));
    await Promise.all(posts.map((post) => Post.create(post)));
    await Promise.all(reviews.map((review) => Review.create(review)));
    await Promise.all(restaurants.map((restaurant) => Restaurant.create(restaurant)));
    console.log('seeding was successful');
    db.close();
  } catch (error) {
    console.error('something went wrong when seeding database!');
    console.error(error);
    db.close();
  }
};

seed();
