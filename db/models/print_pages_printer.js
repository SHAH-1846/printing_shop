//Model to store binding operators in finishing and binding section

const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const print_pages_printers = sequelize.define("print_pages_printers", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  print_pages_printer: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

print_pages_printers.sync({ alter : true });

module.exports = print_pages_printers