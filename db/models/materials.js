const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const materials = sequelize.define("materials", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  material: {
    type: Sequelize.STRING,
    allowNull: false,
  },

});

 materials.sync({ alter: true });

module.exports = materials