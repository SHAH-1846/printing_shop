const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const operators =  sequelize.define("operators",{

id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
    operator_name : {
        type: Sequelize.STRING,
        allowNull : false,
    },

    operator_type : {
        type : Sequelize.STRING,
        allowNull : false
    }


});

 operators.sync({ alter: true });

module.exports = operators