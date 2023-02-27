const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const finishing_and_binding =  sequelize.define("finishing_and_binding",{

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

    binding_type : {
        type: Sequelize.STRING,
        allowNull : false,
    },

    
    material_id : {
        //From materials table
        type: Sequelize.INTEGER,
        allowNull : false,
    },

    
    operator_id : {
        //From operators table
        type: Sequelize.INTEGER,
        allowNull : false,
    },

    binding_type : {
        type: Sequelize.STRING,
        allowNull : false,
    },

    page_count : {
        type : Sequelize.INTEGER,
        allowNull : false
    },

    book : {
        type : Sequelize.STRING,
        allowNull : false
    },

    quantity : {
        type : Sequelize.INTEGER,
        allowNull : false
    },

    binding_material_id : {
        //From materials table
        type : Sequelize.STRING,
        allowNull : false
    },

    unit_cost : {
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

    require_perforation : {
        type : Sequelize.STRING,
        allowNull : false
    },
    
    


});

//  department.sync({ alter: true });

module.exports = finishing_and_binding