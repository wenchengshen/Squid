/**
 * @author wenc
 * @description  连接redis 的方法
 *
 * **/

const  redis=require('redis')

const {REDIS_CONF}=require('../conf/db')



//创建客户端
const redisClient=redis.createClient(REDIS_CONF.port,REDIS_CONF.host);
redisClient.on('err',err=>{
 console.log("err",err)
})


/**
 * redis set
 * @param {string} key
 * **/

function set(key,val,timeout=60*60){
   if(typeof val == 'object'){
       val =JSON.stringify(val)
   }

   redisClient.set(key,val)
   redisClient.expire(key,timeout)
}

function get(key){
    const promise=new Promise((resolve,reject)=>{
        redisClient.get(key,(err,val)=>{
            if(err){
                reject(err)
                return
            }
            if(val==null){
                resolve(null)
                return
            }
            try{
                resolve(
                    JSON.parse(val)
                )
            }catch(ex){
                resolve(val)
            }
        })
    })
    return promise
}


module.export={
    set
}
