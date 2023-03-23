const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const printers =  sequelize.define("printers",{

id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
    name : {
        type: Sequelize.STRING,
        allowNull : false,
        // defaultValue : '',
    },

    status : {
        type : Sequelize.STRING,
        allowNull : false,
        // defaultValue : '',
    },

    color_type : {
        type : Sequelize.STRING,
        allowNull : false,
        // defaultValue : '',
    },


    cost : {
        type : Sequelize.DECIMAL(10,4),
        allowNull : false,
        // defaultValue : '0.0000',
    },

    paper_support : {
        type : Sequelize.INTEGER,
        allowNull : false,
        // defaultValue : '0',
    }

});

 printers.sync({ alter: true });

module.exports = printers