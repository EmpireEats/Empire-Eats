const Sequelize = require('sequelize');
const db = require('../db');

const Restaurant = db.define('restaurant', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  hours: {
    type: Sequelize.TEXT,
    
  },
  number: {
    type: Sequelize.STRING,

  },
  avgRating: {
    type: Sequelize.FLOAT
  }
})

module.exports = Restaurant