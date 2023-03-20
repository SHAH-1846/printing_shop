const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const materials = sequelize.define("materials", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

   name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  type : {
    type : Sequelize.STRING,
    allowNull : false
  },

  cost : {
    type : Sequelize.STRING,
    allowNull : false
  }

});

 materials.sync({ alter: true });

module.exports = materials