const Sequelize = require("sequelize");
const db = require("../db");
const User = require("./User");
const Review = require("./Review");

const getLeaderboard = async () => {
  const leaderboard = await Review.findAll({
    attributes: [
      "userId",
      [
        Sequelize.fn("COUNT", Sequelize.col("placeId")),
        "reviewsCount",
      ],
      [Sequelize.literal('"user"."username"'), "username"],
      [Sequelize.literal('"user"."image"'), "image"], // Fetching user's profile picture
    ],
    where: {
      userId: { [Sequelize.Op.not]: null },
      placeId: { [Sequelize.Op.not]: null },
    },
    group: ["userId", '"user.username"', '"user.image"'], // Including 'user.image' in group clause
    include: [
      {
        model: User,
        attributes: [],
      },
    ],
    order: [
      [Sequelize.literal('"reviewsCount"'), "DESC"],
      [Sequelize.literal('"user"."username"'), "ASC"],
    ],
    raw: true,
  });

  let currentRank = 1;
  let rankIncrement = 1;
  let currentReviewsCount = null;

  leaderboard.forEach((user, index) => {
    if (index === 0 || currentReviewsCount !== user.reviewsCount) {
      currentRank += rankIncrement - 1;
      rankIncrement = 1;
      currentReviewsCount = user.reviewsCount;
    } else {
      rankIncrement++;
    }
    user.rank = currentRank;
  });

  return leaderboard;
};

  
module.exports = {
  getLeaderboard,
};
