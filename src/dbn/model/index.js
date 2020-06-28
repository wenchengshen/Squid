/**
 * 模型数据入口
 * 20200624 03:19
 * **/

const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelations')


//一个bolg属于一个用户
Blog.belongsTo(User, {
    foreignKey: 'userId'
})


UserRelation.belongsTo(User,{
    foreignKey:'followerId'
})
User.hasMany(UserRelation,{
    foreignKey:"userId"
})
Blog.belongsTo(User,{
    foreignKey:"userId",
    // targetKey:"followerId"
})

module.exports={
    User,
    Blog,
    UserRelation
}