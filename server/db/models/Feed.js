const Sequelize = require("sequelize");
const db = require("../db");
const User = require("./User");
const Review = require("./Review");


const getFeed = async () => {
  const feed = await Review.findAll({  
    attributes: [
      "userId",
      "image",
      "placeId",
      [Sequelize.literal("substring(\"body\" from 1 for 150)"), "previewText"],
      [Sequelize.col("review.createdAt"), "createdAt"], 
      "name",
      "address",
      [Sequelize.col("user.username"), "username"], // had to change this to "user.username" to get it to work
    ],
    where: {
      userId: { [Sequelize.Op.not]: null },
      body: { [Sequelize.Op.not]: null },
      image: { [Sequelize.Op.not]: null },
    },
    include: [
      {
        model: User,
        attributes: ["username"],
        as: "user",
      },
    ],
    order: [[Sequelize.col("review.createdAt"), "DESC"]], 
    raw: true,
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