const Sequelize = require("sequelize");
const db = require("../db");
const User = require("./User");
const Review = require("./Review");

const getLeaderboard = async () => {
    const leaderboard = await Review.findAll({
      attributes: [
        "userId",
        [
          Sequelize.fn("COUNT", Sequelize.col("restaurantId")),
          "reviewsCount",
        ],
        [Sequelize.literal('"user"."username"'), "username"]
      ],
      where: {
        userId: { [Sequelize.Op.not]: null },
        restaurantId: { [Sequelize.Op.not]: null },
      },
      group: ["userId", '"user.username"'],
      include: [
        {
          model: User,
          attributes: [],
        },
      ],
      order: [[Sequelize.literal('"reviewsCount"'), "DESC"]],
      raw: true,
    });
  
    leaderboard.forEach((review, index) => {
      review.rank = index + 1;
    });
  
    return leaderboard;
};

  
module.exports = {
  getLeaderboard,
};
