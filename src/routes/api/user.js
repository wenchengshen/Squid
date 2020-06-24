/**
 * @description
 * @author wencs
 *
 * **/


 const router=require('koa-router')()
 const {isExist,register,login,changeInfo,changePassword,logout} =require('../../controller/user')
 const {loginCheck} =require('../../middlewares/loginChecks')
 router.prefix('/api/user')


 //注册路由
 router.post('/register',async (ctx,next)=>{
    const {username,password,gender}=ctx.request.body;
     //调用 controller 方法
    ctx.body=await register({username,password,gender})
 })

 //判断是否存在
 router.post('/isExist',async (ctx,next)=>{
     const {username}=ctx.request.body;
     ctx.body=await isExist(username)
 })


  //登录

 router.post('/login',async (ctx,next)=>{
   const {username,password}=ctx.request.body;
   ctx.body=await login({ctx,username,password})
})

//修改用户信息
router.patch('/changeInfo',loginCheck,async  (ctx,next)=>{
    const {  nickname,city, picture}=ctx.request.body;
    ctx.body=await changeInfo({ ctx,nickname,city, picture})
})



router.patch('/changePassword',loginCheck,async (ctx,next)=>{
    const {  password,newPassword}=ctx.request.body;
    const { username } = ctx.session.userInfo
    ctx.body = await changePassword(username, password, newPassword)
})

router.post('/logout',loginCheck,async (ctx,next)=>{
     ctx.body = await logout(ctx)
})

 module.exports=router
