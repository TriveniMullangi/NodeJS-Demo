const sequelize = require('sequelize');
var mariaConnection = require('../connection/dbConnection');

const Comment1 = mariaConnection.define('comment', {
    commentId: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    postId: {

        type: sequelize.INTEGER,
        foreignKey: true
    },
    commentDescription: sequelize.STRING,
    commentCreatedBy: sequelize.STRING,
    commentCreatedOn: sequelize.DATE,
    commentModifiedBy: sequelize.STRING,
    commentModifiedOn: sequelize.DATE,

}, {
        timestamps: false,
        freezeTableName: true, // Model tableName will be the same as the model name
        tableName: 'comment'
    });


module.exports = {

    Comment1: Comment1

};