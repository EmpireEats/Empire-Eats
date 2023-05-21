const db = require('./server/db/db');
const { User, Review, Post, HiddenPost } = require('./server/db/index');

const users = [
  {
    firstName: 'Admin',
    lastName: 'Tester',
    email: 'admin@email.com',
    username: 'admin',
    password: 'admin',
    isAdmin: true,
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    password: 'password1',
    isAdmin: false,
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    username: 'janesmith',
    password: 'password2',
    isAdmin: false,
  },
  {
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.johnson@example.com',
    username: 'mjohnson',
    password: 'password3',
    isAdmin: false,
  },
  {
    firstName: 'Emily',
    lastName: 'Williams',
    email: 'emily.williams@example.com',
    username: 'emilyw',
    password: 'password4',
    isAdmin: false,
  },
  {
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@example.com',
    username: 'davidb',
    password: 'password5',
    isAdmin: false,
  },
  {
    firstName: 'Sophia',
    lastName: 'Taylor',
    email: 'sophia.taylor@example.com',
    username: 'sophiat',
    password: 'password6',
    isAdmin: false,
  },
  {
    firstName: 'Daniel',
    lastName: 'Anderson',
    email: 'daniel.anderson@example.com',
    username: 'daniela',
    password: 'password7',
    isAdmin: false,
  },
  {
    firstName: 'Olivia',
    lastName: 'Thomas',
    email: 'olivia.thomas@example.com',
    username: 'oliviat',
    password: 'password8',
    isAdmin: false,
  },
  {
    firstName: 'Lucas',
    lastName: 'Jackson',
    email: 'lucas.jackson@example.com',
    username: 'lucasj',
    password: 'password9',
    isAdmin: false,
  },
  {
    firstName: 'Ava',
    lastName: 'White',
    email: 'ava.white@example.com',
    username: 'avaw',
    password: 'password10',
    isAdmin: false,
  },
];

const reviews = [
  {
    userId: 1,
    placeId: 3,
    name: 'Tasty Tacos',
    address: '123 Main St, New York, NY 10001',
    rating: 3,
    body: 'Amazing tacos! Loved the atmosphere and service was great.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg',
  },
  {
    userId: 2,
    placeId: 6,
    name: 'Hearty Healthy',
    address: '456 Main St, New York, NY 10001',
    rating: 2,
    body: 'Good food but the service was slow.',
    image:
      'https://www.chelseasmessyapron.com/wp-content/uploads/2018/10/ACAIBOWLF8-500x500.jpg',
  },
  {
    userId: 3,
    placeId: 1,
    name: 'Delicious Diner',
    address: '789 Main St, New York, NY 10001',
    rating: 3,
    body: "The best breakfast I've ever had! Highly recommend!",
    image:
      'https://simply-delicious-food.com/wp-content/uploads/2022/09/Breakfast-board28.jpg',
  },
  {
    userId: 4,
    placeId: 7,
    name: 'Vibrant Vegan',
    address: '456 Elm Avenue, New York, NY 10002',
    rating: 1,
    body: "I'm not a fan of their vegan options.",
    image:
      'https://hips.hearstapps.com/hmg-prod/images/tofu-1650647553.jpg?crop=0.998xw:0.335xh;0.00160xw,0.359xh&resize=1200:*',
  },
  {
    userId: 5,
    placeId: 10,
    name: 'Scrumptious Seafood',
    address: '789 Oak Lane, New York, NY 10003',
    rating: 3,
    body: 'The seafood was fresh and delicious! Will definitely come back.',
    image:
      'https://www.marthastewart.com/thmb/uMWKSx5ZqI_toVzyBeXYHGcxh4Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/seafood-in-fennel-broth-0519-a0cda0a6_0-2731d6940b89422aa76a26bf099bb1e5.jpg',
  },
  {
    userId: 1,
    placeId: 4,
    name: 'Perfect Pizza',
    adress: '321 Maple Drive, New York, NY 10004',
    rating: 3,
    body: 'The pizza was absolutely fantastic! Loved it!',
    image:
      'https://secretnyc.co/wp-content/uploads/2020/01/best-pizza-in-nyc_fumo_harlem-1-1.jpg',
  },
  {
    userId: 2,
    placeId: 5,
    name: 'Sizzling Sushi',
    address: '654 Pine Street, New York, NY 10005',
    rating: 2,
    body: "The sushi was just okay. I've had better.",
    image:
      'https://images.getbento.com/accounts/c21c527d2227d1c4b30f2cb3a397c71e/media/images/44163Super_Jones_Large_Catering_with_Hands.jpg?w=1200&fit=max&auto=compress,format',
  },
  {
    userId: 3,
    placeId: 8,
    name: 'Cozy Café',
    address: '987 Elm Street, New York, NY 10006',
    rating: 3,
    body: 'A cozy spot with great coffee and pastries.',
    image:
      'https://media2.metrotimes.com/metrotimes/imager/u/magnum/30660103/promenade.jpg?cb=1659016997',
  },
  {
    userId: 4,
    placeId: 9,
    name: 'Delightful Donuts',
    address: '654 Oak Lane, New York, NY 10007',
    rating: 1,
    body: 'The donuts were too sweet for my taste.',
    image: 'https://assets3.thrillist.com/v1/image/2948648/792x528',
  },
  {
    userId: 5,
    placeId: 2,
    name: 'Burgers & More',
    address: '321 Pine Street, New York, NY 10008',
    rating: 3,
    body: 'Burgers were juicy and flavorful. A great spot for lunch!',
    image:
      'https://insanelygoodrecipes.com/wp-content/uploads/2020/02/Burger-and-Fries.jpg',
  },
];

const posts = [
  {
    userId: 1,
    message: 'Heading out for pizza, looking for a friend!',
    preference: 'one on one',
    isActive: true,
    latitude: 40.6977041, // within a mile
    longitude: -73.9047561, // within a mile
  },
  {
    userId: 2,
    message: 'Organizing a sushi night, anyone in?',
    preference: 'group',
    isActive: true,
    latitude: 40.6957041, // within a mile
    longitude: -73.9067561, // within a mile
  },
  {
    userId: 3,
    message: "Haven't decided where to eat yet, any suggestions?",
    preference: 'no preference',
    isActive: true,
    latitude: 40.7167041, // outside a mile
    longitude: -73.8957561, // outside a mile
  },
  {
    userId: 4,
    message: 'Craving for some burgers. Anyone want to join?',
    preference: 'one on one',
    isActive: true,
    latitude: 40.6867041, // outside a mile
    longitude: -73.9157561, // outside a mile
  },
  {
    userId: 5,
    message: 'Planning a big BBQ party, looking for more people!',
    preference: 'group',
    isActive: true,
    latitude: 40.7067041, // outside a mile
    longitude: -73.8857561, // outside a mile
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(users.map((user) => User.create(user)));
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
