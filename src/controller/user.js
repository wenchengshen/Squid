
/**
 * @description  
 * @author wencs
 * 
 * **/

const {getUserInfo} =require('../services/user')

const {SuccessModel,FaliedModel} =require('../model/ResModel')



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


module.exports ={
    isExist
}