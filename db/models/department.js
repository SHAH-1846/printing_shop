const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const department =  sequelize.define("department",{

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

//  department.sync({ force: true });

module.exports = department