
/**
 * @description  
 * @author wencs
 * 
 * **/

const {getUserInfo,createUserInfo,updateUserInfo} =require('../services/user')

const {SuccessModel,FaliedModel} =require('../model/ResModel')
const { errorMonitor } = require('koa')

const doCrypto=require('../util/cryp')
// const { CITEXT } = require('sequelize/types')
const user = require('../services/user')

/***
 * 用户是否存在
 * **/
async  function isExist(username){
      //业务逻辑处理
      //servers
      //统一返回
      const userInfo = await getUserInfo(username)
      if (!userInfo) {
        //存在
        return new SuccessModel(userInfo)
      }else{
        //不存在数据
        return new FaliedModel({
            errno:10003,
            message:"用户已存在"
        })
      }
}

async function register({username,password,gender}){
      //获取用户信息
      const userInfo =await getUserInfo(username)
      if (userInfo) {
        //不存在数据
        return new FaliedModel({
            errno:10003,
            message:"用户已存在"
        })
      }
      //services 注册用户
    try{
        const result= await createUserInfo({username,password:doCrypto(password),gender})
        return new SuccessModel()
    }catch(err){
      return new FaliedModel({
            errno:10004,
            message:"注册傻逼"
      })
    }
}

async function login({ctx,username,password}){
  //获取用户信息
  const userInfo =await getUserInfo(username,doCrypto(password))
  if (!userInfo) {
    //不存在数据
    return new FaliedModel({
        errno:10003,
        message:"登录失败"
    })
  }
  //登陆成功
  if (ctx.session.userInfo == null) {
      ctx.session.userInfo = userInfo;
  }
  return new SuccessModel({
     data: userInfo
  })
}


async  function changeInfo({ctx,nickname,city,picture}){
    const  {username}=ctx.session.userInfo;
    try{
        const result= await updateUserInfo({nickname,city,picture},{username})
        if(result){
            Object.assign(ctx.session.userInfo,{
                nickname,city,picture
            })
            return new SuccessModel()
        }else{
            return new FaliedModel({
                errno:10004,
                message:"修改用户信息失败！"
            })
        }
    }catch(err){
        return new FaliedModel({
            errno:10004,
            message:"修改用户信息失败！"
        })
    }
}


async function changePassword(username, password, newPassword){
    const result=await updateUserInfo(
        {
            newPassword:doCrypto(newPassword)
        },{
            username,
            password:doCrypto(password)
        }
    )
    if(result){
        return new SuccessModel()
    }
    return new FaliedModel({
        errno:100090,
        message:"信息错误"
    })
}

/**
 * 退出登录
 * @param {Object} ctx ctx
 */
async function logout(ctx) {
    delete ctx.session.userInfo
    return new SuccessModel()
}


module.exports ={
    isExist,
    register,
    login,
    changeInfo,
    changePassword,
    logout
}