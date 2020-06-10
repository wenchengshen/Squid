const seq=require('./db')

require('./models')


seq.authenticate().then(()=>{
    console.log("is ok ")
}).catch(res=>{
    console.log(res,"err")
})

seq.sync({force:true}).then(res=>{
    console.log("lianjie ok")
    process.exit()
}).catch(err=>{
    console.log("err")
})