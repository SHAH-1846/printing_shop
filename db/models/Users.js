const {Sequelize} = require('sequelize');
const sequelize = require('../db-conn');
// const user_roles_connection = require('./user_roles_connection');
// const user_roles = require('./user_roles');


const users =  sequelize.define("users",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    first_name : {
        type: Sequelize.STRING,
        allowNull : false,
    },

    last_name : {
        type: Sequelize.STRING,
        allowNull : false,
    },

    email : {
        type: Sequelize.STRING,
        allowNull : false,
    },
    
    image : {
        type: Sequelize.STRING,
        allowNull : false,
    },

    phone : {
        type: Sequelize.STRING,
        allowNull : false,
    },

    department_id : {
        //id from department table
        type : Sequelize.INTEGER,
        allowNull : false,
    },

    section_id : {
        //id from section table
        type : Sequelize.INTEGER,
        allowNull : false,
    },

    branch_id : {
        type : Sequelize.STRING,
        allowNull : false,
    },

    password : {
        type: Sequelize.STRING,
        allowNull : false,
    },
    otp : {
        type : Sequelize.STRING,
        allowNull : false,
    },

    otp_status : {
        type : Sequelize.STRING,
        allowNull : false
    },
    
    new_user : {
        type : Sequelize.STRING,
        allowNull : false,
    }

});

//do not use this in production
 users.sync({ alter: true });

module.exports = users
