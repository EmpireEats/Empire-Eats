const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../db');

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: { 
      isEmail: true 
    },
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
        type: Sequelize.STRING,
        defaultValue: 'https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg',
    },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

User.addHook('beforeCreate', async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

module.exports = User;
