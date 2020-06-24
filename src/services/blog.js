/**
 * 2020 06024 03:48
 * wencs
 * ***/

const {Blog,User}=require('../dbn/model/index')
const {formateUser,formateBlog} =require('./_formate')

async  function getBlogList({ userId,pageIndex,pageSize=10}){
      const result=Blog.findAndCountAll({
          limit: pageSize, // 每页多少条
          offset: pageSize * pageIndex, // 跳过多少条
          order: [
              ['id', 'desc']
          ],
          where: { id:userId },
      })
   console.log(result.rows,"result",userId,"userId")
    // if(!result) return
    // let blogList =result.rows.map(row=>row.dataValues)
    // return {
    //     count:blogList.count,
    //     blogList
    // }
    return {}
}
module.exports={
    getBlogList
}