const sequelize = require('sequelize');
var mariaConnection = require('../connection/dbConnection');

//Model Schemaa for Employee Table
const User = mariaConnection.define('user', {
    userId: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: sequelize.STRING,
    middleName: sequelize.STRING,
    lastName: sequelize.STRING,
    city: sequelize.STRING,
    state: sequelize.STRING,
    country: sequelize.STRING,
    isDelete: sequelize.INTEGER
}, {
        timestamps: false,
        freezeTableName: true, // Model tableName will be the same as the model name
        tableName: 'user'
    });



// User.sync();
// Post.sync();
// Comment1.sync();

module.exports = {

    User: User

};