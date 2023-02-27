const {Sequelize} = require('sequelize');

const sequelize = require('../db-conn');


const price =  sequelize.define("price",{

id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },


});

//  department.sync({ force: true });

module.exports = price