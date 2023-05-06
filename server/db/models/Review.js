const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 3,
    }
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  picture: {
    type: Sequelize.BLOB,
    
  },
});

module.exports = Review