//In Print Pages section
const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const job_print_colors = sequelize.define("job_print_colors", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  job_print_color: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

job_print_colors.sync({ alter : true });

module.exports = job_print_colors