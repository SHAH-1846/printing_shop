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
    },

    type : {
        type : Sequelize.STRING,
        allowNull : false,
    },

    purpose : {
        type : Sequelize.STRING,
        allowNull : false,
    },

    description : {
        type : Sequelize.TEXT,
        allowNull : false,
    },

    cost : {
        type : Sequelize.STRING,
        allowNull : false,
    }


});

//  department.sync({ force: true });

module.exports = printers