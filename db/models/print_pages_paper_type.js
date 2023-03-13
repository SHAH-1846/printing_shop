//Model to store binding operators in finishing and binding section

const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const print_pages_paper_types = sequelize.define("print_pages_paper_types", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  paper_type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

print_pages_paper_types.sync({ alter : true });

module.exports = print_pages_paper_types