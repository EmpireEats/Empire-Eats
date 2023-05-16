const db = require('./server/db/db');
const {
  User,
  Review,
  Post,
  HiddenPost,
} = require('./server/db/index');

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
    rating: 3,
    body: 'Amazing tacos! Loved the atmosphere and service was great.',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg',
  },
  {
    userId: 2,
    placeId: 6,
    name: 'Hearty Healthy',
    rating: 2,
    body: 'Good food but the service was slow.',
    picture: 'https://www.chelseasmessyapron.com/wp-content/uploads/2018/10/ACAIBOWLF8-500x500.jpg',
  },
  {
    userId: 3,
    placeId: 1,
    name: 'Delicious Diner',
    rating: 3,
    body: "The best breakfast I've ever had! Highly recommend!",
    picture: 'https://simply-delicious-food.com/wp-content/uploads/2022/09/Breakfast-board28.jpg',
  },
  {
    userId: 4,
    placeId: 7,
    name: 'Vibrant Vegan',
    rating: 1,
    body: "I'm not a fan of their vegan options.",
    picture: 'https://hips.hearstapps.com/hmg-prod/images/tofu-1650647553.jpg?crop=0.998xw:0.335xh;0.00160xw,0.359xh&resize=1200:*',
  },
  {
    userId: 5,
    placeId: 10,
    name: 'Scrumptious Seafood',
    rating: 3,
    body: 'The seafood was fresh and delicious! Will definitely come back.',
    picture: 'https://www.marthastewart.com/thmb/uMWKSx5ZqI_toVzyBeXYHGcxh4Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/seafood-in-fennel-broth-0519-a0cda0a6_0-2731d6940b89422aa76a26bf099bb1e5.jpg',
  },
  {
    userId: 1,
    placeId: 4,
    name: 'Perfect Pizza',
    rating: 3,
    body: 'The pizza was absolutely fantastic! Loved it!',
    picture: 'https://secretnyc.co/wp-content/uploads/2020/01/best-pizza-in-nyc_fumo_harlem-1-1.jpg',
  },
  {
    userId: 2,
    placeId: 5,
    name: 'Sizzling Sushi',
    rating: 2,
    body: "The sushi was just okay. I've had better.",
    picture: 'https://images.getbento.com/accounts/c21c527d2227d1c4b30f2cb3a397c71e/media/images/44163Super_Jones_Large_Catering_with_Hands.jpg?w=1200&fit=max&auto=compress,format',
  },
  {
    userId: 3,
    placeId: 8,
    name: 'Cozy Café',
    rating: 3,
    body: 'A cozy spot with great coffee and pastries.',
    picture: 'https://media2.metrotimes.com/metrotimes/imager/u/magnum/30660103/promenade.jpg?cb=1659016997',
  },
  {
    userId: 4,
    placeId: 9,
    name: 'Delightful Donuts',
    rating: 1,
    body: 'The donuts were too sweet for my taste.',
    picture: 'https://assets3.thrillist.com/v1/image/2948648/792x528',
  },
  {
    userId: 5,
    placeId: 2,
    name: 'Burgers & More', 
    rating: 3,
    body: 'Burgers were juicy and flavorful. A great spot for lunch!',
    picture: 'https://www.seriouseats.com/thmb/e16lLOoVEix_JZTv7iNyAuWkPn8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2014__09__20140918-jamie-olivers-comfort-food-insanity-burger-david-loftus-f7d9042bdc2a468fbbd50b10d467dafd.jpg',
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
