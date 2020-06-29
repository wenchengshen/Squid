/***
 * 加载主页
 * @author wencs
 * @description 列表
 * **/


const router = require('koa-router')()
const {loginCheck} =require('../../middlewares/loginChecks')
const {getIndexList,create} =require('../../controller/blog')
const {getFans,getFollowers} =require('../../controller/user-relation')

router.prefix('/api/blog')

router.post('/create',loginCheck,async (ctx,next)=>{
      const { content, image } = ctx.request.body
      const { id: userId } = ctx.session.userInfo
      ctx.body = await create({ userId, content, image })
})

/**
 * @time 2020-06-29
 * @author wencs
 * @ description 获取当前用户的和关注人的评论列表
 * **/

router.get('/loadMore/:pageIndex',loginCheck,async (ctx,next)=>{
      const {pageIndex}=ctx.params;
      const pageNum=Number(pageIndex); //整数类型
      const { id: userId } = ctx.session.userInfo

      // //获取关注人的信息
      // const followersResult = await getFollowers(userId)
      // const { count: followersCount, followersList } = followersResult.data
      //
      // const followerIdArray=followersList.map(item=>item.followerId)
      // console.log(followerIdArray,"followerIdArray");


      const result=await getIndexList(pageNum,userId)
      ctx.body=result
})

module.exports=router