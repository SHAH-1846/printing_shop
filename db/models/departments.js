const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const departments = sequelize.define("departments", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  department: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

        departments.sync({ alter : true });

module.exports = departments