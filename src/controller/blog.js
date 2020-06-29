/**
 * 2020 0624
 * **/

const {PAGE_SIZE}=require('../conf/constant')
const {SuccessModel,ErrorModel}=require('../model/ResModel')
const {getBlogList,createBlog}=require('../services/blog')
const xss = require('xss')


/***
 * 新增数据
 * **/
async  function create({userId, content, image}){
    // 创建微博
    try {
        const blog = await createBlog({
            userId,
            content:xss(content),
            image
        })
        return new SuccessModel(blog)
    }catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel({errno:10009,message:"创建失败"})
    }
}
//获取列表
async  function getIndexList(pageIndex=0,userId){
    const result= await  getBlogList(
         {
             userId,
             pageIndex,
             pageSize:PAGE_SIZE
         })
    const {count,blogList}=result
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })
}
//获取列表 加上关注
async  function getIndexListAll(pageIndex=0,followerIdArray){
    let resultStr=[],resultStrCount=0
    for(let i =0;i<followerIdArray.length;i++){
        const result= await getBlogList(
            {
                userId: followerIdArray[i],
                pageIndex,
                pageSize:PAGE_SIZE
            })
        const {count,blogList}=result
        resultStr=resultStr.concat(blogList)
        resultStrCount+=count
    }

    resultStr=resultStr.sort(function (a,b) {
        return Date.parse(a.createdAt) - Date.parse(b.createdAt)<0;//时间正序
    })
    return new SuccessModel({
        isEmpty: resultStr.length === 0,
        blogList:resultStr,
        pageSize: PAGE_SIZE,
        pageIndex,
        count:resultStrCount
    })
}



module.exports={
    getIndexList,
    create,
    getIndexListAll
}

