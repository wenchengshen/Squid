/***
 * 加载主页
 * @author wencs
 * @description 列表
 * **/


const router = require('koa-router')()
const {loginCheck} =require('../../middlewares/loginChecks')
const {getIndexList} =require('../../controller/blog')


router.prefix('/api/blog')

router.get('/loadMore/:pageIndex',loginCheck,async (ctx,next)=>{
      const {pageIndex}=ctx.params;
      const pageNum=Number(pageIndex); //整数类型
      const { id: userId } = ctx.session.userInfo
      const result=await getIndexList(pageNum,userId)
      ctx.body=result
})

module.exports=router