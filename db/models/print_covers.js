const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const print_covers =  sequelize.define("print_covers",{

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

    
    paper_type_id : {
        //From paper_types table
        type: Sequelize.INTEGER,
        allowNull : false,
    },

    
    print_cover_machine_id : {
        //From print_cover_machines table
        type: Sequelize.INTEGER,
        allowNull : false,
    },

    print_cover_material_id : {
        //From print_cover_materials table
        type: Sequelize.INTEGER,
        allowNull : false,
    },

    print_slides : {
        type: Sequelize.STRING,
        allowNull : false,
    },

    cover_quantity : {
        type : Sequelize.INTEGER,
        allowNull : false
    },

    status : {
        type : Sequelize.STRING,
        allowNull : false
    },

    requested_date : {
        type : Sequelize.STRING,
        allowNull : false
    },

    completed_date : {
        type : Sequelize.STRING,
        allowNull : false
    },

    require_lamination : {
        type : Sequelize.STRING,
        allowNull : false
    },
    
    


});

//  department.sync({ alter: true });

module.exports = print_covers