const {Sequelize} = require('sequelize');
const sequelize = require('../db-conn');


const users =  sequelize.define("users",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name : {
        type: Sequelize.STRING,
        allowNull : false,
    },

    email : {
        type: Sequelize.STRING,
        allowNull : false,
    },

    phone : {
        type: Sequelize.STRING,
        allowNull : false,
    },

    type : {
        type: Sequelize.STRING,
        allowNull : false,
    },

    password : {
        type: Sequelize.STRING,
        allowNull : false,
    },

}, {
    timestamps : false
});

module.exports = users
