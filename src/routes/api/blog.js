/***
 * 加载主页
 * @author wencs
 * @description 列表
 * **/


const router = require('koa-router')()
const {loginCheck} =require('../../middlewares/loginChecks')
const {getIndexList,create,getIndexListAll} =require('../../controller/blog')
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

      const followersResult = await getFollowers(userId)
      const { count: followersCount, followersList } = followersResult.data


      let followerIdArray=followersList.map(item=>item.followerId)
      followerIdArray.push(userId)

      // 获取第一页数据
      const result = await getIndexListAll(pageIndex,followerIdArray)
      // const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

      // const result=await getIndexList(pageNum,userId)
      ctx.body=result
})

module.exports=router