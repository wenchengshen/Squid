/**
 * 
 * @description env
 * @author wencs
 * **/


const  ENV=process.env.NODE_ENV

module.exports={
    isDev: ENV === 'dev',
    isTest: ENV === 'test',
    notTest: ENV !== 'test'
}