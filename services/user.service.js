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
                        required:true
                    }]
                }
            ]
        });
        res.status(HTTP_CODES.OK).send({
            "statusCode": HTTP_CODES.OK,
            "info": "List of users,posts and comments",
            "Users": userData
        })
    }
    catch (e) {
        next(e);//Send Database Error to app.js to Error Handler Middleware
    }
}

//Get Users Service 
var getUsers = async (req, res, next) => {

    try {
        let user={},post={},comment={};
        let users=[],data=[];
        let userData = await userModel.User.findAll({
            include: [
                {
                    model: postModel.Post,
                    required:true,
                    
                    include: [{
                        model:commentModel.Comment1,
                        required:true
                    }]
                }
            ]
        });
       // res.send(userData);
        for(var i=0; i<userData.length;i++){
             if(userData[i].userId){
                //console.log(data.employees[i].posts)

                user.userId = userData[i].userId;
                user.firstName = userData[i].firstName;
                user.middleName = userData[i].middleName;
                user.lastName = userData[i].lastName;
                user.city = userData[i].city;
                user.state = userData[i].state;
                user.country = userData[i].country;
                user.sDelete = userData[i].isDelete;
                users.push(user);
                for(var j=0;j<userData[i].posts.length;j++){
                    if(userData[i].posts[j].postId)
                    {
                        post.postId = userData[i].posts[j].postId;
                        post.postDescription = userData[i].posts[j].postDescription;
                        post.postCreatedBy = userData[i].posts[j].postCreatedBy;
                        post.postCreatedOn = userData[i].posts[j].postCreatedOn;
                        post.postModifiedBy = userData[i].posts[j].postModifiedBy;
                        post.postModifiedOn = userData[i].posts[j].postModifiedOn;
                        users.push(post);
                        for(var k=0;k<userData[i].posts[j].comments.length;k++)
                        {
                            if(userData[i].posts[j].comments[k].commentId)
                            {
                                comment.commentId = userData[i].posts[j].comments[k].commentId;
                                comment.commentDescription = userData[i].posts[j].comments[k].commentDescription;
                                comment.commentCreatedBy = userData[i].posts[j].comments[k].commentCreatedBy;
                                comment.commentCreatedOn = userData[i].posts[j].comments[k].commentCreatedOn;
                                comment.commentModifiedBy = userData[i].posts[j].comments[k].commentModifiedBy;
                                comment.commentModifiedOn = userData[i].posts[j].comments[k].commentModifiedOn;
                                users.push(comment);
                                data.push(users);
                                comment={};
                                users=[];
                             }
                        }
                        
                    }           

                }
        
            } 
        }
        res.status(HTTP_CODES.OK).send({
            "statusCode": HTTP_CODES.OK,
            "info": "List of users,posts and comments",
            "Users": data
        }) ;
    }
    catch (e) {
        next(e);//Send Database Error to app.js to Error Handler Middleware
    }
}


module.exports = {
    getAll:getAll,
    getUsers: getUsers,
};