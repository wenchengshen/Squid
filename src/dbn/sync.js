const seq=require('./seq')

require('./model')


seq.authenticate().then(()=>{
    console.log("create succis ok ")
}).catch(res=>{
    console.log(res,"err")
})

seq.sync({force:true}).then(res=>{
    console.log("同步数据创建成功 ok")
    process.exit()
}).catch(err=>{
    console.log("err")
})