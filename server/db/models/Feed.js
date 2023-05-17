const Sequelize = require("sequelize");
const db = require("../db");
const User = require("./User");
const Review = require("./Review");

const getFeed = async () => {
  const feed = await Review.findAll({
    attributes: [
      "userId",
      "image",
      [Sequelize.literal("substring(\"body\" from 1 for 30)"), "previewText"], 
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
    order: [["createdAt", "DESC"]],
    raw: true,
  });

  return feed;
};

module.exports = {
  getFeed,
};
