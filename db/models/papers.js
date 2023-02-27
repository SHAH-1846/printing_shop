const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const papers =  sequelize.define("papers",{

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

    material_id : {
        //From materials table
        type : Sequelize.INTEGER,
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

module.exports = papers