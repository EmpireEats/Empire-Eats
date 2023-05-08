const Sequelize = require('sequelize');
const db = require('../db');

const Leaderboard = db.define('leaderboard', {
    image: {
        type: Sequelize.STRING,
        defaultValue: 'https://i.imgur.com/6VBx3io.png',
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    rank: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
});

module.exports = Leaderboard