
/**
 * 
 * sequelize
 * **/
const  Sq=require("sequelize")



const conf={
    host:"localhost",
    dialect:'mysql'
}

const   seq=new Sq("koa",'root','123456',conf)

module.exports=seq;

//测试
// seq.authenticate().then(()=>{
//     console.log("is ok ")
// }).catch(res=>{
//     console.log(res,"err")
// })