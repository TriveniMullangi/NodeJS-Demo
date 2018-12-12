var HTTP_CODES = require('../util/statusCodes');
const userModel = require('../model/user.model');
const postModel = require('../model/post.model');
const commentModel = require('../model/comment.model');


userModel.User.hasMany(postModel.Post, { foreignKey: 'userId' });
postModel.Post.belongsTo(userModel.User, { foreignKey: 'userId' });
commentModel.Comment1.belongsTo(postModel.Post, { foreignKey: 'postId' });
postModel.Post.hasMany(commentModel.Comment1, { foreignKey: "postId" });

//Get All Employees Data Service
var getAll = async (req, res, next) => {

    try {
        let userData = await userModel.User.findAll({
            include: [
                {
                    model: postModel.Post,
                    required:true,
                    include: [{
                        model:commentModel.Comment1,
                        //required:true
                    }]
                }
            ]
        });
        res.status(HTTP_CODES.OK).send({
            "statusCode": HTTP_CODES.OK,
            "info": "List of users,posts and comments",
            "employees": userData
        })
    }
    catch (e) {
        next(e);//Send Database Error to app.js to Error Handler Middleware
    }
}

//Get Users Service 
var getUsers = async (req, res, next) => {

    try {
        let userData = await userModel.User.findAll({
            include: [
                {
                    model: postModel.Post,
                    as:'P',
                    attributes: ['postDescription'],
                    required:true,
                    
                    include: [{
                        model:commentModel.Comment1,

                        required:true
                    }]
                }
            ]
        });
        res.status(HTTP_CODES.OK).send({
            "statusCode": HTTP_CODES.OK,
            "info": "List of users,posts and comments",
            "employees": userData
        })
    }
    catch (e) {
        next(e);//Send Database Error to app.js to Error Handler Middleware
    }
}


module.exports = {
    getAll:getAll,
    getUsers: getUsers,
};