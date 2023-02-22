const { Sequelize } = require('sequelize');
const sequelize = require('../db-conn');

const userRoles=  sequelize.define("user_role",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    role:{
        type: Sequelize.STRING,
        allowNull: false,
    },

});

module.exports = userRoles