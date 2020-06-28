/**
 * 2020 06024 03:48
 * wencs
 * ***/

const {Blog,User}=require('../dbn/model/index')
const {formateUser,formateBlog} =require('./_formate')

async  function getBlogList({ userId,pageIndex,pageSize=10}){
    console.log(userId,"result",userId,"userId")
      const result=await  Blog.findAndCountAll({
          limit: pageSize, // 每页多少条
          offset: pageSize * pageIndex, // 跳过多少条
          order: [
              ['id', 'desc']
          ],
          include:[
              {
                  model: User,
                  attributes: ['username', 'nickname', 'picture'],
                  where: {
                      id:userId
                  }
              }
          ]
      })
   console.log(result,"result",userId,"userId")
    if(!result) return
    let blogList =result.rows.map(row=>row.dataValues)
    return {
        count:blogList.count,
        blogList
    }
    // return {}
}



/**
 * 创建微博
 * @param {Object} param0 创建微博的数据 { userId, content, image }
 */
async  function createBlog({userId,content,image}){
     const result=await  Blog.create({
         userId,
         content,
         image
     })
    return result.dataValues
}
module.exports={
    getBlogList,
    createBlog
}