const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const print_cover =  sequelize.define("print_cover",{

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

    print_cover_operator_id : {
        //From print_cover_operator table
        type: Sequelize.INTEGER,
        allowNull : false,
    },

    print_cover_color_id : {
        //From print_cover_color table
        type : Sequelize.INTEGER,
        allowNull : false
    },

    
    print_cover_status_id : {
        // From print_cover_status table
        type: Sequelize.STRING,
        allowNull : false,
    },

    print_cover_printer_id : {
        // From print_cover_printer table
        type : Sequelize.INTEGER,
        allowNull : false
    },

    
    print_cover_paper_type_id : {
        //From print_cover_paper_type table
        type: Sequelize.INTEGER,
        allowNull : false,
    },

    print_cover_side_id : {
        // From print_cover_sides table
        type: Sequelize.INTEGER,
        allowNull : false,
    },

    require_lamination : {
        // Yes or No
        type: Sequelize.STRING,
        allowNull : false,
    },


    print_cover_quantity : {
        type : Sequelize.INTEGER,
        allowNull : false
    },

    print_cover_machine_id : {
        //From print_cover_machines table
        type : Sequelize.STRING,
        allowNull : false
    },

    print_cover_material_id : {
        //From print_cover_materials table
        type : Sequelize.INTEGER,
        allowNull : false
    },

    request_date : {
        type : Sequelize.STRING,
        allowNull : false
    },

    completed_date : {
        type : Sequelize.STRING
    }


});

 print_cover.sync({ alter: true });

module.exports = print_cover