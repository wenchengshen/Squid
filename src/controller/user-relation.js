

const {
    getUsersByFollower,
    getFollowerByUser
} = require('../services/user-relaction')


const { SuccessModel, ErrorModel } = require('../model/ResModel')
/**
 * 根据 userid 获取粉丝列表
 * @param {number} userId 用户 id
 */
async function getFans(userId) {
    const { count, userList } = await getUsersByFollower(userId)
    // 返回
    return new SuccessModel({
        count,
        fansList: userList
    })
}


async  function getFollowers(userId){
    const { count, userList } = await getFollowerByUser(userId)
    // 返回
    return new SuccessModel({
        count,
        followersList: userList
    })
}


module.exports={
    getFans,
    getFollowers
}
