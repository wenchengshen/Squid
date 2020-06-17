/**
 * @description
 * @author wencs
 *
 * **/


 const router=require('koa-router')()

 const {isExist,register,login} =require('../../controller/user')

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
  router.post('/login', async (ctx, next) => {
      //username
      const {
          username
      } = ctx.request.body;
  })



<<<<<<< HEAD



 module.exports=router
=======
    // console.log(ctx)
 })



 router.post('/login',async (ctx,next)=>{
   //username
   const {username,password}=ctx.request.body;
   ctx.body=await login({ctx,username,password})

  // console.log(ctx)
})


 module.exports=router
>>>>>>> 64b4c11be3a8b206f41fe8ff5f21816c7cc319fe
