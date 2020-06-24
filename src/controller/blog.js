/**
 * 2020 0624
 * **/

const {PAGE_SIZE}=require('../conf/constant')
const {SuccessModel}=require('../model/ResModel')
const {getBlogList}=require('../services/blog')

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
module.exports={
    getIndexList
}