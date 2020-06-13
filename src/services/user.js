
/**
 * @description  
 * @author wencs
 * 
 * **/

const {User}=require('../dbn/model/index')

const {formateUser} =require('./_formate')

/**
 * @param {string} username 用户名
 * @param {string} passwod 密码 
 * **/

async function getUserInfo(username,password){
     //查询条件s
     const whereOpt={
         username
     }
     if(password){
         Object.assign(whereOpt,{passwod})
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

     //添加格式化处理
     return formateUser(result.dataValues)
}


module.exports={
    getUserInfo
}