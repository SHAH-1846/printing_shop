//Model to store binding status in finishing and binding section

const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const binding_status = sequelize.define("binding_status", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

binding_status.sync({ alter : true });

module.exports = binding_status