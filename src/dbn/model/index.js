/**
 * 模型数据入口
 * 20200624 03:19
 * **/

const User=require('./User')
const Blog=require('./Blog')


//一个bolg属于一个用户
Blog.belongsTo(User, {
    foreignKey: 'userId'
})
module.exports={
    User,
    Blog
}