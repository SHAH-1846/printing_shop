const { Sequelize } = require('sequelize');
const sequelize = require('../db-conn');

const reset_password_tokens =  sequelize.define("reset_password_tokens",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    token:{
        type: Sequelize.TEXT,
        allowNull: false,
    },

    date:{
        type: Sequelize.STRING,
        allowNull: false,
    }
});

//  reset_password_tokens.sync({ alter: true });


module.exports = reset_password_tokens