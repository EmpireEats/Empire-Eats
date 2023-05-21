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
  latitude: {
    type: Sequelize.DECIMAL,
    allowNull: true,
  },
  longitude: {
    type: Sequelize.DECIMAL,
    allowNull: true,
  },
});

module.exports = Post;
