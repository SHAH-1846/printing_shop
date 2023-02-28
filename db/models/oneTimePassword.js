const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const one_time_passwords = sequelize.define("one_time_passwords", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  one_time_password : {
    type : Sequelize.STRING,
    allowNull : false,
  },

  status : {
    type : Sequelize.STRING,
    allowNull : false,
  }
});

        // one_time_passwords.sync({ alter : true });

module.exports = one_time_passwords