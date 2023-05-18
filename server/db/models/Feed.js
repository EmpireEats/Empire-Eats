const Sequelize = require("sequelize");
const db = require("../db");
const User = require("./User");
const Review = require("./Review");


const getFeed = async () => {
  const feed = await Review.findAll({  
    attributes: [
      "userId",
      "image",
      [Sequelize.literal("substring(\"body\" from 1 for 50)"), "previewText"],
      [Sequelize.col("review.createdAt"), "createdAt"], 
      "name",
      "address",
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