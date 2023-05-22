const db = require('./server/db/db');
const { User, Review, Post, HiddenPost } = require('./server/db/index');

const users = [
  {
    firstName: 'Jennifer',
    lastName: 'Lopez',
    email: 'admin@email.com',
    username: 'JLo',
    password: 'admin',
    image: 'https://twt-thumbs.washtimes.com/media/image/2022/12/01/Election_2022_Senate_Georgia_98764--fd8dc_c0-131-3936-2425_s885x516.jpg?87d0ab315d8ff99bdf3d378dafb22c445189fabf',
    isAdmin: true,
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    password: 'password1',
    image: 'https://www.billboard.com/wp-content/uploads/2023/02/Bad-Bunny-2022-billboard-pro-1260.jpg?w=942&h=623&crop=1',
    isAdmin: false,
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    username: 'janesmith',
    password: 'password2',
    image: 'https://yt3.googleusercontent.com/ytc/AGIKgqOkrCT23ZKi_W9khLZ-jomwDb1BUypxip4spCXj=s900-c-k-c0x00ffffff-no-rj',
    isAdmin: false,
  },
  {
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.johnson@example.com',
    username: 'mjohnson',
    password: 'password3',
    image: 'https://static.toiimg.com/thumb/resizemode-4,width-1200,height-900,msid-95391362/95391362.jpg',
    isAdmin: false,
  },
  {
    firstName: 'Emily',
    lastName: 'Williams',
    email: 'emily.williams@example.com',
    username: 'emilyw',
    password: 'password4',
    image: 'https://static.hiphopdx.com/2023/05/rihanna-topless-pregnancy-photoshoot-1200x675.jpg',
    isAdmin: false,
  },
  {
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@example.com',
    username: 'davidb',
    password: 'password5',
    image: 'https://www.looper.com/img/gallery/pedro-pascals-journey-from-law-order-to-the-last-of-us/intro-1675889423.jpg',
    isAdmin: false,
  },
  {
    firstName: 'Sophia',
    lastName: 'Taylor',
    email: 'sophia.taylor@example.com',
    username: 'sophiat',
    password: 'password6',
    image: 'https://www.instyle.com/thmb/dyD01n5rCyhuWhbZngwBC1DW5mA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/BeyonceMain-cde9b73c1afa4afd852b2474a73cb50a.jpg',    
    isAdmin: false,
  },
  {
    firstName: 'Daniel',
    lastName: 'Anderson',
    email: 'daniel.anderson@example.com',
    username: 'daniela',
    password: 'password7',
    image: 'https://media.vanityfair.com/photos/6410981b8ca680dcb2ee6bc7/master/w_2560%2Cc_limit/1473241075',
    isAdmin: false,
  },
  {
    firstName: 'Olivia',
    lastName: 'Thomas',
    email: 'olivia.thomas@example.com',
    username: 'oliviat',
    password: 'password8',
    image: 'https://parade.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTkwNTc4OTY0OTA0MjIzODY5/kerrywashington_ftr.jpg',
    isAdmin: false,
  },
  {
    firstName: 'Lucas',
    lastName: 'Jackson',
    email: 'lucas.jackson@example.com',
    username: 'lucasj',
    password: 'password9',
    image: 'https://d3i6fh83elv35t.cloudfront.net/newshour/app/uploads/2015/12/GettyImages-85339538-1024x889.jpg',
    isAdmin: false,
  },
  {
    firstName: 'Ava',
    lastName: 'White',
    email: 'ava.white@example.com',
    username: 'avaw',
    password: 'password10',
    image: 'https://cdn.apollo.audio/one/media/6390/8623/196d/da04/f831/1835/lizzo-facts-career.jpg?quality=80&format=jpg&crop=0,0,1062,1890&resize=crop',
    isAdmin: false,
  },
];

const reviews = [
  {
    userId: 1,
    placeId: 'ChIJt-yA-iFawokRgod4eT1xYkc',
    name: '3 Z Restaurant',
    address: '280 Broadway, New York, NY 10007, USA',
    body: 'The food was absolutely delicious! Every dish we tried was bursting with flavors. The staff was friendly and attentive, making the overall dining experience delightful. Highly recommend visiting this place!',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg',
  },
  {
    userId: 2,
    placeId: 'ChIJt-yA-iFawokRgod4eT1xYkc',
    name: '3 Z Restaurant',
    address: '280 Broadway, New York, NY 10007, USA',
    body: 'Unfortunately, the food didn\'t meet my expectations. The flavors were bland, and the presentation was lackluster. Additionally, the service was slow, leaving me disappointed with the overall experience.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg',
  },
  {
    userId: 3,
    placeId: 'ChIJt-yA-iFawokRgod4eT1xYkc',
    name: '3 Z Restaurant',
    address: '280 Broadway, New York, NY 10007, USA',
    body: 'The food was decent, but the service needs improvement. The servers seemed overwhelmed, and it took a while for our orders to arrive. However, the ambiance was nice and the prices were reasonable.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg',
  },
  {
    userId: 4,
    placeId: 'ChIJt-yA-iFawokRgod4eT1xYkc',
    name: '3 Z Restaurant',
    address: '280 Broadway, New York, NY 10007, USA',
    body: 'I had a mixed experience at this restaurant. The appetizers were outstanding, full of unique flavors. However, the main course was a bit disappointing. The service was friendly, but the overall value for money could be better.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg',
  },
  {
    userId: 5,
    placeId: 'ChIJt-yA-iFawokRgod4eT1xYkc',
    name: '3 Z Restaurant',
    address: '280 Broadway, New York, NY 10007, USA',
    body: 'What a disappointment! The food was tasteless, and the service was incredibly slow. I wouldn\'t recommend this place to anyone looking for a good dining experience.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg',
  },
  {
    userId: 6,
    placeId: 'ChIJt-yA-iFawokRgod4eT1xYkc',
    name: '3 Z Restaurant',
    address: '280 Broadway, New York, NY 10007, USA',
    body: 'The food was outstanding, and the service matched the quality. Every bite was a burst of flavors, leaving us wanting more. Definitely, a restaurant to visit again!',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg',
  },
  {
    userId: 7,
    placeId: 'ChIJt-yA-iFawokRgod4eT1xYkc',
    name: '3 Z Restaurant',
    address: '280 Broadway, New York, NY 10007, USA',
    body: 'The food was just okay, nothing extraordinary. The service was average as well. It wasn\'t a bad experience, but there are better options available in the area.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg',
  },
  {
    userId: 8,
    placeId: 'ChIJt-yA-iFawokRgod4eT1xYkc',
    name: '3 Z Restaurant',
    address: '280 Broadway, New York, NY 10007, USA',
    body: 'The food was absolutely amazing! Every dish was carefully prepared, and the flavors were outstanding. The service was top-notch, making it a memorable dining experience.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg',
  },
  {
    userId: 9,
    placeId: 'ChIJt-yA-iFawokRgod4eT1xYkc',
    name: '3 Z Restaurant',
    address: '280 Broadway, New York, NY 10007, USA',
    body: 'Unfortunately, the food didn\'t live up to the hype. The flavors were underwhelming, and some dishes were overcooked. On the positive side, the service was friendly and attentive.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg',
  },
  {
    userId: 10,
    placeId: 'ChIJt-yA-iFawokRgod4eT1xYkc',
    name: '3 Z Restaurant',
    address: '280 Broadway, New York, NY 10007, USA',
    body: 'The food was absolutely delicious, and the presentation was outstanding. The staff was knowledgeable and provided excellent recommendations. Will definitely be returning!',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg',
  },
  {
    userId: 2,
    placeId: 'ChIJjVTMyRhawokRhIRN72ZJxPY',
    name: '17 Murray Bar & Restaurant',
    address: '17 Murray Street, New York',
    body: 'The food at 17 Murray Bar & Restaurant was simply outstanding! Every dish was a delightful blend of flavors, leaving my taste buds wanting more. The ambiance was cozy, and the staff was friendly and attentive. I highly recommend trying their signature cocktails as well.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg',
  },
  {
    userId: 3,
    placeId: 'ChIJjVTMyRhawokRhIRN72ZJxPY',
    name: '17 Murray Bar & Restaurant',
    address: '17 Murray Street, New York',
    body: 'Unfortunately, my experience at 17 Murray Bar & Restaurant was underwhelming. The food lacked flavor, and the service was slow and inattentive. The prices were also on the higher side, considering the quality offered. I wouldn\'t recommend this place.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg',
  },
  {
    userId: 4,
    placeId: 'ChIJjVTMyRhawokRhIRN72ZJxPY',
    name: '17 Murray Bar & Restaurant',
    address: '17 Murray Street, New York',
    body: 'I had a mixed experience at 17 Murray Bar & Restaurant. The appetizers were delicious, but the main course was disappointing. The service was friendly, but a bit slow. The ambiance, however, was charming, creating a pleasant atmosphere.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg',
  },
  {
    userId: 6,
    placeId: 'ChIJjVTMyRhawokRhIRN72ZJxPY',
    name: '17 Murray Bar & Restaurant',
    address: '17 Murray Street, New York',
    body: 'The food at 17 Murray Bar & Restaurant was absolutely divine! Every dish was beautifully presented and bursting with flavors. The attentive staff made sure we had a memorable dining experience. I will definitely be returning!',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg',
  },
  {
    userId: 9,
    placeId: 'ChIJjVTMyRhawokRhIRN72ZJxPY',
    name: '17 Murray Bar & Restaurant',
    address: '17 Murray Street, New York',
    body: 'My visit to 17 Murray Bar & Restaurant was disappointing. The food was mediocre, and the service left much to be desired. The prices were too high for the quality provided. I wouldn\'t recommend this place.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg',
  },
  {
    userId: 1,
    placeId: 'ChIJvUftjmJbwokRzDiHcNWqBbI',
    name: 'Strejorleo Restaurant',
    address: '76 Reade St, New York',
    body: 'The food at Strejorleo Restaurant was absolutely incredible! Every dish we tried was bursting with flavors and beautifully presented. The service was top-notch, making it a memorable dining experience. Highly recommend!',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'
  },
  {
    userId: 3,
    placeId: 'ChIJvUftjmJbwokRzDiHcNWqBbI',
    name: 'Strejorleo Restaurant',
    address: '76 Reade St, New York',
    body: 'What a delightful experience at Strejorleo Restaurant! The food was outstanding, and the staff was attentive and friendly. We loved every moment and would highly recommend this place to anyone looking for a fantastic dining experience.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'
  },
  {
    userId: 5,
    placeId: 'ChIJvUftjmJbwokRzDiHcNWqBbI',
    name: 'Strejorleo Restaurant',
    address: '76 Reade St, New York',
    body: 'Unfortunately, my experience at Strejorleo Restaurant was disappointing. The food was bland, and the service was slow. The prices were also on the higher side for the quality provided. I won\'t be returning.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'
  },
  {
    userId: 7,
    placeId: 'ChIJvUftjmJbwokRzDiHcNWqBbI',
    name: 'Strejorleo Restaurant',
    address: '76 Reade St, New York',
    body: 'The flavors at Strejorleo Restaurant were a delightful surprise! Every dish had a unique twist, and the ingredients were fresh. The staff was friendly and provided great recommendations. A must-visit for food enthusiasts!',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'
  },
  {
    userId: 11,
    placeId: 'ChIJvUftjmJbwokRzDiHcNWqBbI',
    name: 'Strejorleo Restaurant',
    address: '76 Reade St, New York',
    body: 'I had a mixed experience at Strejorleo Restaurant. While some dishes were outstanding, others were underwhelming. The service was friendly, but a bit slow. Overall, it was an average dining experience.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'
  },
  {
    userId: 3,
    placeId: 'ChIJ6e4q1BhawokRWWDyNSiQ4yo',
    name: 'Benares',
    address: '45 Murray Street, New York',
    body: 'The food at Benares was absolutely amazing! Every dish was bursting with flavors and beautifully presented. The staff was attentive and provided great service. Highly recommend!',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'
  },
  {
    userId: 2,
    placeId: 'ChIJ6e4q1BhawokRWWDyNSiQ4yo',
    name: 'Benares',
    address: '45 Murray Street, New York',
    body: 'Unfortunately, my experience at Benares was disappointing. The food lacked flavor, and the service was slow. The prices were also on the higher side for the quality provided. I won\'t be returning.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'
  },
  {
    userId: 4,
    placeId: 'ChIJ6e4q1BhawokRWWDyNSiQ4yo',
    name: 'Benares',
    address: '45 Murray Street, New York',
    body: 'I had a fantastic dining experience at Benares! The food was exquisite, and the staff was attentive and friendly. The flavors were unique and left a lasting impression. Highly recommended!',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'
  },
  {
    userId: 6,
    placeId: 'ChIJ6e4q1BhawokRWWDyNSiQ4yo',
    name: 'Benares',
    address: '45 Murray Street, New York',
    body: 'The food at Benares was underwhelming. The flavors were not as pronounced as expected, and some dishes were overcooked. The service, however, was friendly and attentive.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'
  },
  {
    userId: 8,
    placeId: 'ChIJ6e4q1BhawokRWWDyNSiQ4yo',
    name: 'Benares',
    address: '45 Murray Street, New York',
    body: 'The dining experience at Benares was exceptional! The food was top-notch, and the service was outstanding. The staff went above and beyond to make us feel welcomed and catered to our dietary preferences.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'
  },
  {
    userId: 10,
    placeId: 'ChIJ6e4q1BhawokRWWDyNSiQ4yo',
    name: 'Benares',
    address: '45 Murray Street, New York',
    body: 'I had a mixed experience at Benares. While some dishes were outstanding, others were underwhelming. The ambiance was pleasant, but the service was a bit slow. Overall, it was an average dining experience.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'
  },
  {
    userId: 1,
    placeId: 'ChIJ6e4q1BhawokRWWDyNSiQ4yo',
    name: 'Benares',
    address: '45 Murray Street, New York',
    body: 'The food at Benares was absolutely incredible! Every dish was a delight to the taste buds, with a perfect balance of flavors. The service was exceptional, making it a memorable dining experience.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'
  },
  {
    userId: 5,
    placeId: 'ChIJ6e4q1BhawokRWWDyNSiQ4yo',
    name: 'Benares',
    address: '45 Murray Street, New York',
    body: 'The food at Benares was disappointing. The flavors were underwhelming, and some dishes were overcooked. The service was average. Overall, not the best dining experience.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'
  },
  {
    userId: 7,
    placeId: 'ChIJ6e4q1BhawokRWWDyNSiQ4yo',
    name: 'Benares',
    address: '45 Murray Street, New York',
    body: 'I had a wonderful time at Benares. The food was delicious, and the service was excellent. The staff was knowledgeable and provided great recommendations. Highly recommended!',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'
  },
  {
    userId: 3,
    placeId: 'ChIJPVb-ZB9awokRRe3YX-hqWLY',
    name: 'Sheezan Restaurant',
    address: '183 Church St, New York',
    body: 'The dining experience at Sheezan Restaurant was exceptional! The food was outstanding, and the service was top-notch. The staff went above and beyond to make our evening memorable. Highly recommend!',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'
  },
  {
    userId: 4,
    placeId: 'ChIJPVb-ZB9awokRRe3YX-hqWLY',
    name: 'Sheezan Restaurant',
    address: '183 Church St, New York',
    body: 'Unfortunately, my experience at Sheezan Restaurant was disappointing. The food was average, and the service was slow. The prices were also on the higher side for the quality provided. I won\'t be returning.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'
  },
  {
    userId: 5,
    placeId: 'ChIJPVb-ZB9awokRRe3YX-hqWLY',
    name: 'Sheezan Restaurant',
    address: '183 Church St, New York',
    body: 'I had an amazing dining experience at Sheezan Restaurant! The food was delicious, and the service was impeccable. The staff was friendly and attentive. I would highly recommend this place!',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'
  },
  {
    userId: 6,
    placeId: 'ChIJPVb-ZB9awokRRe3YX-hqWLY',
    name: 'Sheezan Restaurant',
    address: '183 Church St, New York',
    body: 'The food at Sheezan Restaurant was absolutely outstanding! Each dish was carefully prepared and packed with flavors. The service was excellent, and the staff made us feel welcome throughout our visit. Highly recommended!',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'
  },
  {
    userId: 7,
    placeId: 'ChIJPVb-ZB9awokRRe3YX-hqWLY',
    name: 'Sheezan Restaurant',
    address: '183 Church St, New York',
    body: 'The food at Sheezan Restaurant was disappointing. The flavors were underwhelming, and the portions were small for the price. However, the service was friendly and attentive.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'
  },
  {
    userId: 11,
    placeId: 'ChIJPVb-ZB9awokRRe3YX-hqWLY',
    name: 'Sheezan Restaurant',
    address: '183 Church St, New York',
    body: 'I had a fantastic experience at Sheezan Restaurant! The food was incredible, and the service was top-notch. The staff was knowledgeable and provided great recommendations. I will definitely be returning!',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'
  },
  {
    userId: 2,
    placeId: 'ChIJi4sJ0x5awokRNZJmb2jXn1o',
    name: 'Saleya',
    address: '65 W Broadway, New York',
    body: 'The dining experience at Saleya was exceptional! The food was outstanding, and the service was top-notch. The staff went above and beyond to ensure a memorable evening. Highly recommend!',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'
  },
  {
    userId: 1,
    placeId: 'ChIJi4sJ0x5awokRNZJmb2jXn1o',
    name: 'Saleya',
    address: '65 W Broadway, New York',
    body: 'Unfortunately, my experience at Saleya was disappointing. The food was average, and the service was slow. The prices were also on the higher side for the quality provided. I won\'t be returning.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'
  },
  {
    userId: 6,
    placeId: 'ChIJi4sJ0x5awokRNZJmb2jXn1o',
    name: 'Saleya',
    address: '65 W Broadway, New York',
    body: 'I had a wonderful time at Saleya! The food was delicious, and the service was excellent. The staff was friendly and attentive. I would highly recommend this place!',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'
  },
  {
    userId: 3,
    placeId: 'ChIJi4sJ0x5awokRNZJmb2jXn1o',
    name: 'Saleya',
    address: '65 W Broadway, New York',
    body: 'The food at Saleya was absolutely outstanding! Each dish was carefully prepared and packed with flavors. The service was excellent, and the staff made us feel welcome throughout our visit. Highly recommended!',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'
  },
  {
    userId: 5,
    placeId: 'ChIJi4sJ0x5awokRNZJmb2jXn1o',
    name: 'Saleya',
    address: '65 W Broadway, New York',
    body: 'The food at Saleya was disappointing. The flavors were underwhelming, and the portions were small for the price. However, the service was friendly and attentive.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'
  },
  {
    userId: 10,
    placeId: 'ChIJi4sJ0x5awokRNZJmb2jXn1o',
    name: 'Saleya',
    address: '65 W Broadway, New York',
    body: 'I had a fantastic experience at Saleya! The food was incredible, and the service was top-notch. The staff was knowledgeable and provided great recommendations. I will definitely be returning!',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'
  },
  {
    userId: 11,
    placeId: 'ChIJi4sJ0x5awokRNZJmb2jXn1o',
    name: 'Saleya',
    address: '65 W Broadway, New York',
    body: 'The food at Saleya was underwhelming. The flavors were not as pronounced as expected, and some dishes were overcooked. The service, however, was friendly and attentive.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'
  }
];



// const posts = [
//   {
//     userId: 1,
//     message: 'Heading out for pizza, looking for a friend!',
//     preference: 'one on one',
//     isActive: true,
//     latitude: 40.6977041, // within a mile
//     longitude: -73.9047561, // within a mile
//   },
//   {
//     userId: 2,
//     message: 'Organizing a sushi night, anyone in?',
//     preference: 'group',
//     isActive: true,
//     latitude: 40.6957041, // within a mile
//     longitude: -73.9067561, // within a mile
//   },
//   {
//     userId: 3,
//     message: "Haven't decided where to eat yet, any suggestions?",
//     preference: 'no preference',
//     isActive: true,
//     latitude: 40.7167041, // outside a mile
//     longitude: -73.8957561, // outside a mile
//   },
//   {
//     userId: 4,
//     message: 'Craving for some burgers. Anyone want to join?',
//     preference: 'one on one',
//     isActive: true,
//     latitude: 40.6867041, // outside a mile
//     longitude: -73.9157561, // outside a mile
//   },
//   {
//     userId: 5,
//     message: 'Planning a big BBQ party, looking for more people!',
//     preference: 'group',
//     isActive: true,
//     latitude: 40.7067041, // outside a mile
//     longitude: -73.8857561, // outside a mile
//   },
// ];

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(users.map((user) => User.create(user)));
    await Promise.all(reviews.map((review) => Review.create(review)));
    // await Promise.all(posts.map((post) => Post.create(post)));
    console.log('seeding was successful');
    db.close();
  } catch (error) {
    console.error('something went wrong when seeding database!');
    console.error(error);
    db.close();
  }
};

seed();