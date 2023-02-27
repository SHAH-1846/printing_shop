const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const print_pages =  sequelize.define("print_pages",{

    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    job_id : {
        //from jobs table
        type : Sequelize.INTEGER,
        allowNull : false
    },

    printer_id : {
        //From printer table
        type: Sequelize.INTEGER,
        allowNull : false,
    },

    color : {
        type : Sequelize.STRING,
        allowNull : false
    },

    
    paper_type_id : {
        //From paper_types table
        type: Sequelize.INTEGER,
        allowNull : false,
    },

    job_print_color : {
        type : Sequelize.STRING,
        allowNull : false
    },

    
    job_print_paper_type_id : {
        //From paper_types table
        type: Sequelize.INTEGER,
        allowNull : false,
    },

    operator_id : {
        //From operators table
        type: Sequelize.INTEGER,
        allowNull : false,
    },

    print_slides : {
        type: Sequelize.STRING,
        allowNull : false,
    },


    additional_notes : {
        type : Sequelize.TEXT,
        allowNull : false
    },

    item_pages : {
        type : Sequelize.STRING,
        allowNull : false
    },

    required_item_quantity : {
        type : Sequelize.INTEGER,
        allowNull : false
    },

    required_paper_quantity : {
        type : Sequelize.STRING,
        allowNull : false
    },

    print_total : {
        type : Sequelize.STRING,
        allowNull : false
    },



});

//  print_pages.sync({ alter: true });

module.exports = print_pages