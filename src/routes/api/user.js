/**
 * @description
 * @author wencs
 *
 * **/


 const router=require('koa-router')()

 const {isExist,register,login} =require('../../controller/user')
const {loginCheck} =require('../../middlewares/loginChecks')
 router.prefix('/api/user')


 //注册路由
 router.post('/register',async (ctx,next)=>{
    const {username,password,gender}=ctx.request.body;
     console.log(ctx.request.body);
     //调用 controller 方法
    ctx.body=await register({username,password,gender})
 })

 //判断是否存在
 router.post('/isExist',async (ctx,next)=>{
     //username
     const {username}=ctx.request.body;
     ctx.body=await isExist(username)
 })


  //登录




 router.post('/login',loginCheck,async (ctx,next)=>{
   //username
   const {username,password}=ctx.request.body;
   ctx.body=await login({ctx,username,password})

  // console.log(ctx)
})


 module.exports=router
