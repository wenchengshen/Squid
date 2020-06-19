
/**
 * @description  
 * @author wencs
 * 
 * **/

const {getUserInfo,createUserInfo} =require('../services/user')

const {SuccessModel,FaliedModel} =require('../model/ResModel')
const { errorMonitor } = require('koa')

const doCrypto=require('../util/cryp')
// const { CITEXT } = require('sequelize/types')
const user = require('../services/user')



async  function isExist(username){
      //业务逻辑处理
      //servers
      //统一返回
      const userinfo =await getUserInfo(username)
      if(!userinfo){
        //存在
        return new SuccessModel(userinfo)
      }else{
        //不存在数据
        return new FaliedModel({
            erron:10003,
            message:"用户已存在"
        })
      }
}



async function register({username,password,gender}){
      //获取用户信息
      
      const userinfo =await getUserInfo(username)
      if(userinfo){
        //不存在数据
        return new FaliedModel({
            erron:10003,
            message:"用户已存在"
        })
      }
      //services 注册用户
      try{
        const result= await createUserInfo({username,password:doCrypto(password),gender})
        return new SuccessModel()
    }catch(err){
      return new FaliedModel({
            erron:10004,
            message:"注册傻逼"
      })
    }
}


async function login({ctx,username,password}){
  //获取用户信息
  const userinfo =await getUserInfo(username,doCrypto(password))
  if(!userinfo){
    //不存在数据
    return new FaliedModel({
        errno:10003,
        message:"登录失败"
    })
  }
  //登陆成功
  debugger
  if(ctx.session.userinfo==null){
      ctx.session.userinfo =userinfo;
  }
  return new SuccessModel({
     data: userinfo
  })
}


module.exports ={
    isExist,
    register,
    login
}