//In Print Pages section
const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const job_print_operators = sequelize.define("job_print_operators", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  job_print_operator: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

job_print_operators.sync({ alter : true });

module.exports = job_print_operators