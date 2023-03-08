//Model to store requested_by and requested_to entries in UI images

const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const clients = sequelize.define("clients", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  client: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

clients.sync({ alter : true });

module.exports = clients