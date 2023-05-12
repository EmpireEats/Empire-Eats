const db = require('./server/db/db');
const { User, Review, Post, Restaurant } = require('./server/db/index');

const users = [
  {
    firstName: 'Admin',
    lastName: 'Tester',
    email: 'admin@email.com',
    username: 'admin',
    password: 'admin',
    isAdmin: true,
    // latitude: 40.760423,
    // longitude: -73.829546
    latitude: 40.760423,
    longitude: -73.829546,
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    password: 'password1',
    isAdmin: false,
    // latitude: 40.759013,
    // longitude: -73.831967
    latitude: 40.759013,
    longitude: -73.831967,
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    username: 'janesmith',
    password: 'password2',
    isAdmin: false,
    // latitude: 40.755234,
    // longitude: -73.827604
    latitude: 40.755234,
    longitude: -73.827604,
  },
  {
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.johnson@example.com',
    username: 'mjohnson',
    password: 'password3',
    isAdmin: false,
    // latitude: 40.752476,
    // longitude: -73.829408
    latitude: 40.752476,
    longitude: -73.829408,
  },
  {
    firstName: 'Emily',
    lastName: 'Williams',
    email: 'emily.williams@example.com',
    username: 'emilyw',
    password: 'password4',
    isAdmin: false,
    // latitude: 40.750059,
    // longitude: -73.838952
    latitude: 40.750059,
    longitude: -73.838952,
  },
  {
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@example.com',
    username: 'davidb',
    password: 'password5',
    isAdmin: false,
    // latitude: 40.750710,
    // longitude: -73.838543
    latitude: 40.75071,
    longitude: -73.838543,
  },
  {
    firstName: 'Sophia',
    lastName: 'Taylor',
    email: 'sophia.taylor@example.com',
    username: 'sophiat',
    password: 'password6',
    isAdmin: false,
    // latitude: 40.752860,
    // longitude: -73.840511
    latitude: 40.75286,
    longitude: -73.840511,
  },
  {
    firstName: 'Daniel',
    lastName: 'Anderson',
    email: 'daniel.anderson@example.com',
    username: 'daniela',
    password: 'password7',
    isAdmin: false,
    // latitude: 40.754686,
    // longitude: -73.838244
    latitude: 40.754686,
    longitude: -73.838244,
  },
  {
    firstName: 'Olivia',
    lastName: 'Thomas',
    email: 'olivia.thomas@example.com',
    username: 'oliviat',
    password: 'password8',
    isAdmin: false,
    // latitude: 40.758797,
    // longitude: -73.828764
    latitude: 40.758797,
    longitude: -73.828764,
  },
  {
    firstName: 'Lucas',
    lastName: 'Jackson',
    email: 'lucas.jackson@example.com',
    username: 'lucasj',
    password: 'password9',
    isAdmin: false,
    // latitude: 40.758186,
    // longitude: -73.830291
    latitude: 40.758186,
    longitude: -73.830291,
  },
  {
    firstName: 'Ava',
    lastName: 'White',
    email: 'ava.white@example.com',
    username: 'avaw',
    password: 'password10',
    isAdmin: false,
    // latitude: 40.756068,
    // longitude: -73.830317
    latitude: 40.756068,
    longitude: -73.830317,
  },
];

const restaurants = [
  {
    name: 'Delicious Diner',
    address: '123 Main St, New York, NY 10001',
    hours: 'Mon-Fri: 7AM-10PM, Sat-Sun: 8AM-9PM',
    number: '(555) 123-4567',
    avgRating: 2.5,
  },
  {
    name: 'Burgers & More',
    address: '456 Market St, New York, NY 10002',
    hours: 'Mon-Sun: 11AM-10PM',
    number: '(555) 234-5678',
    avgRating: 2.0,
  },
  {
    name: 'Tasty Tacos',
    address: '789 Park Ave, New York, NY 10003',
    hours: 'Mon-Sun: 10AM-9PM',
    number: '(555) 345-6789',
    avgRating: 2.2,
  },
  {
    name: 'Perfect Pizza',
    address: '101 Central St, New York, NY 10004',
    hours: 'Mon-Sun: 11AM-11PM',
    number: '(555) 456-7890',
    avgRating: 1.7,
  },
  {
    name: 'Sizzling Sushi',
    address: '112 Wall St, New York, NY 10005',
    hours: 'Mon-Fri: 11AM-10PM, Sat-Sun: 12PM-9PM',
    number: '(555) 567-8901',
    avgRating: 2.9,
  },
  {
    name: 'Hearty Healthy',
    address: '123 Broadway St, New York, NY 10006',
    hours: 'Mon-Fri: 7AM-8PM, Sat: 8AM-6PM, Sun: Closed',
    number: '(555) 678-9012',
    avgRating: 2.3,
  },
  {
    name: 'Vibrant Vegan',
    address: '456 Union St, New York, NY 10007',
    hours: 'Mon-Sun: 9AM-9PM',
    number: '(555) 789-0123',
    avgRating: 3.0,
  },
  {
    name: 'Cozy Café',
    address: '789 Madison Ave, New York, NY 10008',
    hours: 'Mon-Fri: 7AM-7PM, Sat-Sun: 8AM-6PM',
    number: '(555) 890-1234',
    avgRating: 2.4,
  },
  {
    name: 'Delightful Donuts',
    address: '101 Lexington Ave, New York, NY 10009',
    hours: 'Mon-Fri: 6AM-7PM, Sat-Sun: 7AM-5PM',
    number: '(555) 901-2345',
    avgRating: 1.9,
  },
  {
    name: 'Scrumptious Seafood',
    address: '112 Greenwich St, New York, NY 10010',
    hours: 'Mon-Sun: 11AM-11PM',
    number: '(555) 012-1010',
    avgRating: 2.3,
  },
];

const reviews = [
  {
    userId: 1,
    placeId: 3,
    rating: 3,
    body: 'Amazing tacos! Loved the atmosphere and service was great.',
    picture: null,
  },
  {
    userId: 2,
    placeId: 6,
    rating: 2,
    body: 'Good food but the service was slow.',
    picture: null,
  },
  {
    userId: 3,
    placeId: 1,
    rating: 3,
    body: "The best breakfast I've ever had! Highly recommend!",
    picture: null,
  },
  {
    userId: 4,
    placeId: 7,
    rating: 1,
    body: "I'm not a fan of their vegan options.",
    picture: null,
  },
  {
    userId: 5,
    placeId: 10,
    rating: 3,
    body: 'The seafood was fresh and delicious! Will definitely come back.',
    picture: null,
  },
  {
    userId: 1,
    placeId: 4,
    rating: 3,
    body: 'The pizza was absolutely fantastic! Loved it!',
    picture: null,
  },
  {
    userId: 2,
    placeId: 5,
    rating: 2,
    body: "The sushi was just okay. I've had better.",
    picture: null,
  },
  {
    userId: 3,
    placeId: 8,
    rating: 3,
    body: 'A cozy spot with great coffee and pastries.',
    picture: null,
  },
  {
    userId: 4,
    placeId: 9,
    rating: 1,
    body: 'The donuts were too sweet for my taste.',
    picture: null,
  },
  {
    userId: 5,
    placeId: 2,
    rating: 3,
    body: 'Burgers were juicy and flavorful. A great spot for lunch!',
    picture: null,
  },
];

const posts = [
  {
    userId: 1,
    message: 'Heading out for pizza, looking for a friend!',
    preference: 'one on one',
    isActive: true,
  },
  {
    userId: 2,
    message: 'Organizing a sushi night, anyone in?',
    preference: 'group',
    isActive: true,
  },
  {
    userId: 3,
    message: "Haven't decided where to eat yet, any suggestions?",
    preference: 'no preference',
    isActive: true,
  },
  {
    userId: 4,
    message: 'Craving for some burgers. Anyone want to join?',
    preference: 'one on one',
    isActive: true,
  },
  {
    userId: 5,
    message: 'Planning a big BBQ party, looking for more people!',
    preference: 'group',
    isActive: true,
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(users.map((user) => User.create(user)));
    await Promise.all(
      restaurants.map((restaurant) => Restaurant.create(restaurant))
    );
    await Promise.all(reviews.map((review) => Review.create(review)));
    await Promise.all(posts.map((post) => Post.create(post)));
    console.log('seeding was successful');
    db.close();
  } catch (error) {
    console.error('something went wrong when seeding database!');
    console.error(error);
    db.close();
  }
};

seed();
