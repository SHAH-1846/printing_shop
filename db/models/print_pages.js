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
        //From jobs table sent through req body
        type : Sequelize.INTEGER,
        allowNull : false
    },

    job_print_operator_id : {
        //From job_print_operators table
        type: Sequelize.INTEGER,
        allowNull : false,
    },

    job_print_color_id : {
        //From job_print_colors table
        type : Sequelize.INTEGER,
        allowNull : false
    },

    
    print_sides : {
        //Single or Double
        type: Sequelize.STRING,
        allowNull : false,
    },

    item_pages : {
        type : Sequelize.INTEGER,
        allowNull : false
    },

    
    print_pages_printer_id : {
        //From print_pages_printer table
        type: Sequelize.INTEGER,
        allowNull : false,
    },

    job_print_quantity : {
        type: Sequelize.INTEGER,
        allowNull : false,
    },

    paper_type_id : {
        //From print_pages_paper_type table
        type: Sequelize.STRING,
        allowNull : false,
    },


    job_req_paper_quantity : {
        type : Sequelize.INTEGER,
        allowNull : false
    },

    job_print_comment : {
        type : Sequelize.STRING,
        allowNull : false
    },

    print_pages_machine_id : {
        //From print_pages_machines table
        type : Sequelize.INTEGER,
        allowNull : false
    },

    job_print_total : {
        type : Sequelize.STRING,
        allowNull : false
    }



});

 print_pages.sync({ alter: true });

module.exports = print_pages