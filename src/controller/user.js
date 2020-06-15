
/**
 * @description  
 * @author wencs
 * 
 * **/

const {getUserInfo,createUserInfo} =require('../services/user')

const {SuccessModel,FaliedModel} =require('../model/ResModel')
const { errorMonitor } = require('koa')



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
        const result= await createUserInfo({username,password,gender})
        return new SuccessModel()
    }catch(err){
      console.log(err)
      return new FaliedModel({
            erron:10004,
            message:"注册傻逼"
      })
    }

      


}

module.exports ={
    isExist,
    register
}