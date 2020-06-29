/**
 * 2020 0624
 * **/

const {PAGE_SIZE}=require('../conf/constant')
const {SuccessModel,ErrorModel}=require('../model/ResModel')
const {followMan,unfollowMan}=require('../services/profile')
// const xss = require('xss')


/***
 *
 * **/
async  function follow(followerId,userId){
    // 创建微博
    try {
        const blog = await followMan(followerId,userId)
        return new SuccessModel(blog)
    }catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel({errno:10009,message:"操作失败"})
    }
}

async  function unFollow(followerId,userId){
    // 创建微博
    try {
        const blog = await unfollowMan(followerId,userId)
        return new SuccessModel(blog)
    }catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel({errno:10009,message:"操作失败"})
    }
}

module.exports={
    follow,
    unFollow
}