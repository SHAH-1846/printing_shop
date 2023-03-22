const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const papers =  sequelize.define("papers",{

id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
    paper_name : {
        //paper_name
        type: Sequelize.STRING,
        allowNull : false,
        // defaultValue : '',
    },

    paper_size : {
        //paper_size
        type : Sequelize.STRING,
        allowNull : false,
        // defaultValue : '',
    },

    paper_weight : {
        //paper_weight
        type : Sequelize.STRING,
        allowNull : false,
        // defaultValue : ''
    },

    paper_unitcost : {
        //paper_unitcost
        type : Sequelize.DECIMAL(10,4),
        allowNull : false,
        // defaultValue : '0.0000',
    },

    paper_type :{
        //paper_type
        type : Sequelize.STRING,
        allowNull : false,
        // defaultValue : ','
    },

    paper_dimension : {
        //paper_dimension
        type : Sequelize.STRING,
        allowNull : false,
        // defaultValue : ','
    },

});

 papers.sync({ alter: true });

module.exports = papers