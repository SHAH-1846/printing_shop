const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const jobs =  sequelize.define("jobs",{

id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
    job_title : {
        type: Sequelize.STRING,
        allowNull : false,
    },

    requested_by : {
        //from request_and_deliver table
        type: Sequelize.INTEGER,
        allowNull : false,
    },

    requested_by_entity : {
        //From entities table
        type : Sequelize.INTEGER,
        allowNull : false,
    },

    requested_by_department : {
        //From departments table
        type : Sequelize.INTEGER,
        allowNull : false,
    },

    requested_by_section : {
        // From sections table
        type : Sequelize.INTEGER,
        allowNull : false,
    },

    requested_service_id : {
        //from services table
        type : Sequelize.INTEGER,
        // allowNull : false,
    },

    job_type : {
        type : Sequelize.STRING,
        allowNull : false,
    },

    job_req_comment : {
        type : Sequelize.TEXT,
        allowNull : false,
    },

    document_type : {
        type : Sequelize.STRING,
        allowNull : false,
    },

    document_name : {
        type : Sequelize.STRING,
        allowNull : false,
    },

    
    document_mode : {
        type : Sequelize.STRING,
        allowNull : false,
    },

    
    requested_delivery_date : {
        type : Sequelize.STRING,
        allowNull : false,
    },


    job_requested_on : {
    type : Sequelize.STRING,
    allowNull : false,
    },


    job_status : {
    type : Sequelize.STRING,
    allowNull : false,
    },


    job_completed_on : {
    type : Sequelize.STRING,
    // allowNull : false,
    },


    confidentiality : {
    type : Sequelize.STRING,
    allowNull : false,
    },


    require_sample : {
    type : Sequelize.STRING,
    allowNull : false,
    },


    require_edits : {
    type : Sequelize.STRING,
    allowNull : false,
    } ,


    delivery_mode : {
    type : Sequelize.STRING,
    allowNull : false,
    },


    deliver_to : {
    type : Sequelize.STRING,
    allowNull : false,
    },


    deliver_to_entity_id : {
    type : Sequelize.INTEGER,
    allowNull : false,
    },


    deliver_to_school : {
    type : Sequelize.STRING,
    // allowNull : false,
    },


    deliver_to_department_id : {
        //from departments table
    type : Sequelize.INTEGER,
    allowNull : false,
    },


    deliver_to_section_id : {
        //from sections table
    type : Sequelize.INTEGER,
    allowNull : false,

    },


    deliver_to_branch_id : {
        //from branches table
    type : Sequelize.INTEGER,
    // allowNull : false,
    },

    require_cover : {
        type : Sequelize.STRING,
        allowNull : false,
    },

    require_finishing : {
        type : Sequelize.STRING,
        allowNull : false,
    },


    // print_pages : {
    //     type : Sequelize.STRING,
    //     // allowNull : false,
    // }






});

 jobs.sync({ alter: true });

module.exports = jobs