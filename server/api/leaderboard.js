const router = require('express').Router();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

// Define leaderboard and feed models
const Leaderboard = sequelize.define('leaderboard', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rank: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const Feed = sequelize.define('feed', {
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Route for fetching leaderboard data
router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboardData = await Leaderboard.findAll({ order: [['rank', 'ASC']] });
    res.json(leaderboardData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch leaderboard data' });
  }
});

// Route for updating user rankings
router.post('/leaderboard/update', async (req, res) => {
  try {
    const { userId, newRank } = req.body;
    await Leaderboard.update({ rank: newRank }, { where: { user_id: userId } });
    res.json({ message: 'User ranking updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to update user ranking' });
  }
});

// Route for fetching real-time feed data
router.get('/feed', async (req, res) => {
  try {
    const feedData = await Feed.findAll({ order: [['id', 'DESC']] });
    res.json(feedData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch feed data' });
  }
});

module.exports = router;



