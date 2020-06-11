/**
 * 
 * @description env
 * @author wencs
 * **/


const  ENV=process.env.NODE_ENV

module.exports={
    isDev: ENV === 'dev',
}