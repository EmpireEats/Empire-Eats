const Sequelize = require("sequelize");
const db = require("../db");
const User = require("./User");
const Review = require("./Review");
const Restaurant = require("./Restaurant");

const getFeed = async () => {
  const feed = await Review.findAll({
    attributes: [
      "userId",
      "picture",
      [Sequelize.literal("substring(\"body\" from 1 for 100)"), "previewText"],
      [Sequelize.literal('"restaurant"."name"'), "restaurantName"],
    ],
    where: {
      userId: { [Sequelize.Op.not]: null },
      body: { [Sequelize.Op.not]: null },
    },
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Restaurant,
        attributes: [],
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
