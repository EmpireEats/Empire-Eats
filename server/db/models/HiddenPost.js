const Sequelize = require('sequelize');
const db = require('../db');

const HiddenPost = db.define('hiddenPost', {
  postId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'posts',
      key: 'id',
    },
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },
});

module.exports = HiddenPost;
