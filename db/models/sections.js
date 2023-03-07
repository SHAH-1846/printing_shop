const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const sections =  sequelize.define("sections",{

id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    section : {
        type: Sequelize.STRING,
        allowNull : false,
        },


});

 sections.sync({ alter: true });

module.exports = sections