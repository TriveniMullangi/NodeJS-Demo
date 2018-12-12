const sequelize = require('sequelize');
var mariaConnection = require('../connection/dbConnection');

const Post = mariaConnection.define('post', {
    postId: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: sequelize.INTEGER,
        foreignKey: true
    },
    postDescription: sequelize.STRING,
    postCreatedBy: sequelize.STRING,
    postCreatedOn: sequelize.DATE,
    postModifiedBy: sequelize.STRING,
    postModifiedOn: sequelize.DATE,

}, {
        timestamps: false,
        freezeTableName: true, // Model tableName will be the same as the model name
        tableName: 'post'
    });

module.exports = {

    Post: Post,
};
