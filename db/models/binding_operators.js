//Model to store binding operators in finishing and binding section

const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const binding_operators = sequelize.define("binding_operators", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  binding_operator: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

binding_operators.sync({ alter : true });

module.exports = binding_operators