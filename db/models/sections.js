const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const sections =  sequelize.define("sections",{

id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
section_name : {
        type: Sequelize.STRING,
        allowNull : false,
    },


});

//  department.sync({ alter: true });

module.exports = sections