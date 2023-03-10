//Model to store binding operators in finishing and binding section

const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const print_cover_operators = sequelize.define("print_cover_operators", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  print_cover_operator: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

print_cover_operators.sync({ alter : true });

module.exports = print_cover_operators