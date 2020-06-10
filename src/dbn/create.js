const {Blog,User} =require('./models')


!(async function(){
    const userList=await User.create({
        username:"温承燊112",
        password:"1231232efwewefbwejf",
        nickname:"Nikou"
    })
    console.log(userList.dataValues)
})()
