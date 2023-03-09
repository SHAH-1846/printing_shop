const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const binding_materials = sequelize.define("binding_materials", {
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

 binding_materials.sync({ alter: true });

module.exports = binding_materials