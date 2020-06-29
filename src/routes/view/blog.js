const router = require('koa-router')()

const {loginRedirect} =require('../../middlewares/loginChecks')
const {getIndexList,getIndexListAll} =require('../../controller/blog')
const {getSquareBlogList} =require('../../controller/square')
const {getFans,getFollowers} =require('../../controller/user-relation')


const {isExist} =require('../../controller/user')

/**主页**/
router.get('/',loginRedirect, async  (ctx,next)=>{
       const {userInfo}=ctx.session;
       const {id:userId}=ctx.session.userInfo;

    // 获取粉丝
    const fansResult = await getFans(userId)
    const { count: fansCount, fansList } = fansResult.data



    //获取关注人数
    const followersResult = await getFollowers(userId)
    const { count: followersCount, followersList } = followersResult.data


    let followerIdArray=followersList.map(item=>item.followerId)
    followerIdArray.push(userId)

    // 获取第一页数据
    const result = await getIndexListAll(0,followerIdArray)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data
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
       //登录用户信息
       const myUserInfo=ctx.session.userInfo;
       const myUserName=myUserInfo.username;
       const myUserId = myUserInfo.id
       //获取数据列表
       let curUserInfo

       const { username: curUserName } = ctx.params

       const isMe = myUserName === curUserName  //当前用户是否等于登录的用户
      if(isMe){
          // 是当前登录用户
          curUserInfo = myUserInfo
      }else{
          // 不是当前登录用户
          const existResult = await isExist(curUserName)
          if (existResult.errno !== 0) {
              // 用户名不存在
              return
          }
          // 用户名存在
          curUserInfo = existResult.data
      }


    const result = await getIndexList(0,curUserInfo.id)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data


    // 获取粉丝
    const fansResult = await getFans(curUserInfo.id)
    const { count: fansCount, fansList } = fansResult.data

    // 获取关注人列表
    const followersResult = await getFollowers(curUserInfo.id)
    const { count: followersCount, followersList } = followersResult.data
    //是否关注此人
   const amIFollowed = fansList.some(item=>{
        return item.username === myUserName
    })
    await  ctx.render('profile',{
           userData: {
               userInfo:curUserInfo,
               fansData: {
                   count: fansCount,
                   list: fansList
               },
               followersData: {
                   count: followersCount,
                   list: followersList
               },
               atCount:1,
               isMe,
               amIFollowed
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