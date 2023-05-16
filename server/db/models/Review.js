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
      len: [0, 300], // Set the maximum length of the body field to 300 characters
    }
  },
  image: {
    type: Sequelize.STRING,
  },
  title: {
    type: DataTypes.VIRTUAL,
    get() {
      const maxLength = 50; // Maximum number of characters for the title
      return this.getDataValue('body').length > maxLength
        ? this.getDataValue('body').substring(0, maxLength) + '...'
        : this.getDataValue('body');
    },
  },
});

module.exports = Review;