//Model to store binding types in finishing and binding section

const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const binding_types = sequelize.define("binding_types", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  binding_type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

binding_types.sync({ alter : true });

module.exports = binding_types