const { Sequelize } = require("sequelize");

const sequelize = require("../db-conn");

const printer_papers = sequelize.define("printer_papers", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  printer_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    // defaultValue : '0',
  },

  paper_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    // defaultValue : '0',
  },
});

printer_papers.sync({ alter: true });

module.exports = printer_papers;
