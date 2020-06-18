
/**
 * @description 
 * @author wencs
 *
 * **/

const {User}=require('../dbn/model/index')

const {formateUser} =require('./_formate')

/**
 * @param {string} username 用户名
 * @param {string} password 密码
 * **/

async function getUserInfo(username,password){
     //查询条件s
     const whereOpt={
         username
     }
     if(password){
         Object.assign(whereOpt,{password})
     }
     //
     const result=await User.findOne({
         attributes:['id','username','nickname','picture','city'],
         where:whereOpt

     })
     if(result===null){
         //未找到
         return result
     }

     return formateUser(result.dataValues)
}


/**
 * 创建用户
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {string} gender   性别
 * @param {string} nickname 昵称
 * **/
async function  createUserInfo({username,password,gender=3,nickname}){
     const result =await User.create({
         username,
         password,
         nickname:nickname?nickname:username,
         gender
     })
}


module.exports={
    getUserInfo,
    createUserInfo
}
