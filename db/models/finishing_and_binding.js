const { Sequelize } = require("sequelize");

const sequelize = require("../db-conn");

const finishing_and_binding = sequelize.define("finishing_and_binding", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  job_id: {
    //from jobs table , id sent through req body from front-end
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  binding_operator_id: {
    //From binding_operators table
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  binding_type_id: {
    //From binding_types table
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  binding_status_id: {
    //From binding status table
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  material_id: {
    //From materials table
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  binding_page_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  binding_quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  require_perforation: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },

  binding_material_id: {
    // From binding_materials table
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  unit_cost_id: {
    // From binding_unit_costs table
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  request_date: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  completed_date: {
    type: Sequelize.STRING,
  },
});

finishing_and_binding.sync({ alter: true });

module.exports = finishing_and_binding
