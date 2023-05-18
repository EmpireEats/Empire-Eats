const Sequelize = require("sequelize");
const db = require("../db");
const User = require("./User");
const Review = require("./Review");

// const getFeed = async () => {
//   const feed = await Review.findAll({
//     attributes: [
//       "userId",
//       "image",
//       [Sequelize.literal("substring(\"body\" from 1 for 50)"), "previewText"], 
//       "createdAt",
//       "name",
//       "address",
//     ],
//     where: {
//       userId: { [Sequelize.Op.not]: null },
//       body: { [Sequelize.Op.not]: null },
//       image: { [Sequelize.Op.not]: null },
//     },
//     group: ["userId", "image", "createdAt", "name", "address", "user.username"],
    
//     include: [
//       {
//         model: User,
//         attributes: ["username"],
//         // required: true,
//       },
//     ],
//     order: [["createdAt", "DESC"]],
//     raw: true,
//   });

//   // Format dates
//   const formattedFeed = feed.map(item => ({
//     ...item,
//     createdAt: new Intl.DateTimeFormat('en-US').format(new Date(item.createdAt)),
//   }));

//   return formattedFeed;
// };

// module.exports = {
//   getFeed,
// };


const getFeed = async () => {
  const feed = await Review.findAll({  // changed "review" to "Review" to reflect the correct model name
    attributes: [
      "userId",
      "image",
      [Sequelize.literal("substring(\"body\" from 1 for 50)"), "previewText"],
      [Sequelize.col("review.createdAt"), "createdAt"], // use "review" to refer to the table
      "name",
      "address",
    ],
    where: {
      userId: { [Sequelize.Op.not]: null },
      body: { [Sequelize.Op.not]: null },
      image: { [Sequelize.Op.not]: null },
    },
    group: ["userId", "image", Sequelize.col("review.createdAt"), "name", "address", "user.username"], // use "review" to refer to the table

    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
    order: [[Sequelize.col("review.createdAt"), "DESC"]], // use "review" to refer to the table
    // raw: true,
  });

  // Format dates
  const formattedFeed = feed.map(item => ({
    ...item,
    createdAt: new Intl.DateTimeFormat('en-US').format(new Date(item.createdAt)),
  }));

  return formattedFeed;
};

module.exports = {
  getFeed,
};

