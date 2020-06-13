/***
 * @descp  user
 * @wencs
 * *****/


 const seq =require('../seq')

 const {
    STRING,
    DECIMAL,
    TEXT,
    INTEGER,
    BOOLEAN
 }=require('../types')

 const User=seq.define('user', {
     username:{
        type:STRING,
        allowNull:false,
        unique:true,
        commit:"用户名唯一"
     },
     password:{
        type:STRING,
        allowNull:false,
        commit:"密码"
     },
     nickname:{
        type:STRING,
        allowNull:false,
        commit:"昵称"
     },
     gender:{
        type:DECIMAL,
        allowNull:false,
        defaultValue:3,
        commit:"性别"
     },
     picture:{
         type:STRING,
         commit:"头像"
     },
     city:{
         type:STRING,
         commit:"城市"
     }
    
 });
 module.exports=User