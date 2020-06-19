
/***
 * @pauthor
 * ***/

const { FaliedModel } = require("../model/ResModel")


 async  function  loginCheck(ctx,next){
    if(ctx.session && ctx.session.userInfo){
           await next()
           return
    }

    ctx.body=new FaliedModel({
        errno:1003,
    })

 }

 async function loginRedirect(ctx,next){
    if(ctx.session && ctx.session.userInfo){
        await next()
        return
    }
    const url=ctx.url;
    ctx.redirect('/login?url='+encodeURIComponent(url))
 }

 module.exports={
     loginCheck,
     loginRedirect
 }