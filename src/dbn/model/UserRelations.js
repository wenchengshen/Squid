/***
 * @descp  userRelation
 * @wencs
 * *****/
const seq =require('../seq')
const {
    INTEGER
}=require('../types')

const UserRelation=seq.define('userRelation',{
    userId:{
        type:INTEGER,
        allowNull:false,
        comment:"用户id"
    },
    followerId:{
        type:INTEGER,
        allowNull: false,
        comment: "被关注的用户id"
    }
})
module.exports=UserRelation