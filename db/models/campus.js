const {Sequelize, INTEGER} = require('sequelize');
const sequelize = require('../db-conn');


const campus = sequelize.define('campus', {

    id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    },

    campus : {
        type : Sequelize.STRING,
        allowNull : false,
        // unique : true,
        defaultValue : '',
    }
});


campus.sync({alter : true});

module.exports = campus