const router = require('koa-router')()

const {loginRedirect} =require('../../middlewares/loginChecks')
const {getIndexList} =require('../../controller/blog')
const {getSquareBlogList} =require('../../controller/square')
const {getFans,getFollowers} =require('../../controller/user-relation')




/**主页**/
router.get('/',loginRedirect, async  (ctx,next)=>{
       const {userInfo}=ctx.session;
       const {id:userId}=ctx.session.userInfo;

    // 获取第一页数据
    const result = await getIndexList(0,userId)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data


    // 获取粉丝
    const fansResult = await getFans(userId)
    const { count: fansCount, fansList } = fansResult.data



    //获取关注人数
    const followersResult = await getFollowers(userId)
    const { count: followersCount, followersList } = followersResult.data

    await  ctx.render('index',{
           userData: {
               userInfo,
               fansData: {
                   count: fansCount,
                   list: fansList
               },
               followersData: {
                   count: followersCount,
                   list: followersList
               },
               atCount:1
           },
           blogData: {
               isEmpty,
               blogList,
               pageSize,
               pageIndex,
               count
           }
       })
})

router.get('/profile',loginRedirect, async  (ctx,next)=>{
    const {username}=ctx.session.userInfo;
    ctx.redirect(`/profile/${username}`)
})

router.get('/profile/:username',loginRedirect, async  (ctx,next)=>{
       const userInfo=ctx.session.userInfo;
       await  ctx.render('profile',{
           userData: {
               userInfo,
               fansData: {
                   count: 1,
                   list: []
               },
               followersData: {
                   count: 1,
                   list: []
               },
               atCount:1
           },
           blogData: {
               isEmpty:1,
               blogList:[],
               pageSize:1,
               pageIndex:1,
               count:1
           }
       })
})


router.get('/square',loginRedirect, async  (ctx,next)=>{
    // 获取微博数据，第一页
    const result = await getSquareBlogList(0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}
    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})


module.exports = router