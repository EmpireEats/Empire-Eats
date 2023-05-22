const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  placeId: {
    type: Sequelize.STRING,
    allowNull: true, //must be changed to false when we're ready to roll out
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true //must be changed to false when we're ready to roll out
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true //must be changed to false when we're ready to roll out
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      len: [0, 300],
    }
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false, //must be changed to false when we're ready to roll out
  },
  title: {
    type: DataTypes.VIRTUAL,
    get() {
      const maxLength = 50;
      return this.getDataValue('body').length > maxLength
        ? this.getDataValue('body').substring(0, maxLength) + '...'
        : this.getDataValue('body');
    },
  },
});

module.exports = Review;