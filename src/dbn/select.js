
const {Blog,User} =require('./models')


!(async function(){
    const userList=await User.findOne({
        attributes:['username'],
       where :{
           id:1
       }
    })
    console.log(userList.dataValues)
})()
