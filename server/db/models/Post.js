const Sequelize = require('sequelize');
const db = require('../db');

const Post = db.define('post', {
  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  preference: {
    type: Sequelize.ENUM('one on one', 'group', 'no preference'),
    allowNull: false,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Post;
