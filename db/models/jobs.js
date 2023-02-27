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

    requested_user_id : {
        //from users table
        type: Sequelize.INTEGER,
        allowNull : false,
    },

    requested_service_id : {
        //from services table
        type : Sequelize.INTEGER,
        allowNull : false,
    },

    job_type : {
        type : Sequelize.STRING,
        allowNull : false,
    },

    job_description : {
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
    allowNull : false,
    },


    confidentiality : {
    type : Sequelize.STRING,
    allowNull : false,
    },


    requested_sample : {
    type : Sequelize.STRING,
    allowNull : false,
    },


    requested_edits : {
    type : Sequelize.STRING,
    allowNull : false,
    } ,


    delivery_mode : {
    type : Sequelize.STRING,
    allowNull : false,
    },


    delivery_address : {
    type : Sequelize.STRING,
    allowNull : false,
    },


    entity : {
    type : Sequelize.STRING,
    allowNull : false,
    },


    school : {
    type : Sequelize.STRING,
    allowNull : false,
    },


    department_id : {
        //from departments table
    type : Sequelize.INTEGER,
    allowNull : false,
    },


    section_id : {
        //from sections table
    type : Sequelize.INTEGER,
    allowNull : false,

    },


    branch_id : {
        //from branches table
    type : Sequelize.INTEGER,
    allowNull : false,
    },

    finishing : {
        type : Sequelize.STRING,
        allowNull : false,
    },

    print_cover : {
        type : Sequelize.STRING,
        allowNull : false,
    },

    print_pages : {
        type : Sequelize.STRING,
        allowNull : false,
    }






});

//  jobs.sync({ alter: true });

module.exports = jobs