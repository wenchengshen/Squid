/***
 * 加载主页
 * @author wencs
 * @description 列表
 * **/


const router = require('koa-router')()
const {loginCheck} =require('../../middlewares/loginChecks')
const {follow,unFollow} =require('../../controller/profile')


router.prefix('/api/profile')

/**
 * 关注
 * **/
router.post('/follow',loginCheck,async (ctx,next)=>{
    const { userId } = ctx.request.body
    const {id:myUserId}=ctx.session.userInfo
    ctx.body = await follow(userId ,myUserId)
})


/**
 * 取消关注
 * **/
router.post('/unFollow',loginCheck,async (ctx,next)=>{
    const { userId} = ctx.request.body
    const {id:myUserId}=ctx.session.userInfo
    ctx.body = await unFollow(userId,myUserId)
})

module.exports=router