

const { User, UserRelation } = require('../dbn/model/index')
const Sequelize = require('sequelize')
/**
 * 获取关注该用户的用户列表，即该用户的粉丝
 * @param {number} followerId 被关注人的 id
 * **/
async  function getUsersByFollower(followerId){
    const result = await User.findAndCountAll({
        attributes: ['id', 'username', 'nickname', 'picture'],
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: UserRelation,
                where: {
                    followerId,
                    userId: {
                        [Sequelize.Op.ne]: followerId
                    }
                }
            }
        ]
    })
        // 格式化
    let userList = result.rows.map(row => row.dataValues)
    return {
        count: result.count,
        userList
    }
}



async  function getFollowerByUser(userId){
    const result = await UserRelation.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['id', 'username', 'nickname', 'picture'],
            }
        ],
        where: {
            userId,
            followerId: {
                [Sequelize.Op.ne]: userId
            }
        }
    })
    // 格式化
    let userList = result.rows.map(row => row.dataValues)
    return {
        count: result.count,
        userList
    }
}

module.exports={
    getUsersByFollower,
    getFollowerByUser
}