//Model to store requested_by and requested_to entries in UI images

const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const request_profile = sequelize.define("request_profile", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue : '',
  },

  department_id : {
    //{Replace with id from departments table}
    type : Sequelize.INTEGER,
    allowNull : false,
    defaultValue : '0',
  },

  campus_id: {
    //{Replace with id from campuses table}
    type : Sequelize.INTEGER,
    allowNull : false,
    defaultValue : '0',
  },

  email : {
    type : Sequelize.STRING,
    allowNull : false,
    // unique : true,
    defaultValue : '',
  },

  section_id : {
    //{Replace with id from sections table}
    type : Sequelize.INTEGER,
    allowNull : false,
    defaultValue : '0',
  },

  contact_no : {
    type : Sequelize.STRING,
    allowNull : false,
    // unique : true,
    defaultValue : '',
  },

  user_id : {
    //From users table
    type : Sequelize.INTEGER,
    defaultValue : null,
  }

});

request_profile.sync({ alter : true });

module.exports = request_profile


