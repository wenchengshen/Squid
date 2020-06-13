/**
 * @description  
 * @author wencs
 * 
 * **/


 const router=require('koa-router')()

 const {isExist} =require('../../controller/user')

 router.prefix('/api/user')


 //注册
 router.post('/register',async (ctx,next)=>{

 })

 //判断是否存在
 router.post('/isExist',async (ctx,next)=>{
     //username
     const {username}=ctx.request.body;
     ctx.body=await isExist(username)

    // console.log(ctx)

 })


 module.exports=router