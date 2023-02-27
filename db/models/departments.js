const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const departments =  sequelize.define("departments",{

id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
department_name : {
        type: Sequelize.STRING,
        allowNull : false,
    },


});

//  department.sync({ alter: true });

module.exports = departments