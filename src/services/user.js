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


/**
 *  修改用户信息
 * @param {string} nickname 昵称
 * @param {string} city 城市
 * @param {string} picture   图片
 * **/
async  function updateUserInfo({nickname,city,picture,newPassword},{username,password}){
    const updateData={}
    if (nickname){
        updateData.nickname=nickname
    }
    if (city){
        updateData.city=city
    }
    if (picture){
        updateData.picture=picture
    }
    if(newPassword){
        updateData.password=newPassword
    }

    // 拼接查询条件
    const whereData = {
        username
    }
    if(password){
        whereData.password=password
    }
    // 执行修改
    const result = await User.update(updateData, {
        where: whereData
    })
    return result[0] > 0 // 修改的行数
}

module.exports={
    getUserInfo,
    createUserInfo,
    updateUserInfo
}
