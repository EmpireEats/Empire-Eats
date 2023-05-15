const Sequelize = require("sequelize");
const db = require("../db");
const User = require("./User");
const Review = require("./Review");

const getFeed = async () => {
  const feed = await Review.findAll({
    attributes: [
      "userId",
      "picture",
      [Sequelize.literal("substring(\"body\" from 1 for 100)"), "previewText"], //* temp keep this
      // [Sequelize.literal('"restaurant"."name"'), "restaurantName"], //! will change this once we get rid of the restaurant table
      // [Sequelize.literal('"Review"."title"'), "title"],
      //convert photos from binary to url
      // [Sequelize.literal("encode(\"picture\", 'url')"), "picture"],
      ["picture", "pictureUrl"],
    ],
    where: {
      userId: { [Sequelize.Op.not]: null },
      body: { [Sequelize.Op.not]: null },
      picture: { [Sequelize.Op.not]: null },
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
