/**
 * 2020 06024 03:48
 * wencs
 * ***/

const {Blog,User,UserRelation}=require('../dbn/model/index')
const {formateUser,formateBlog} =require('./_formate')

async  function followMan( followerId,userId){
      const result= await  UserRelation.create({
          userId,
          followerId
      })
    return result.dataValues
}

async  function unfollowMan( followerId,userId){
    const result= await  UserRelation.destroy({
        where:{
            userId,
            followerId
        }
    })
    return result>0
}

module.exports={
    followMan,
    unfollowMan
}