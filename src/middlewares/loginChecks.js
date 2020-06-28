
/***
 * @pauthor
 * ***/

const { FaliedModel } = require("../model/ResModel")


 async  function  loginCheck(ctx,next){
     console.log(ctx.session,"session1");
     if(ctx.session && ctx.session.userInfo){
           await next()
           return
    }

    ctx.body=new FaliedModel({
        errno:1003,
    })

 }

 async function loginRedirect(ctx,next){
     console.log(ctx.session,"session2");
     if(ctx.session && ctx.session.userInfo){
        await next()
        return
    }
    const url=ctx.url;
    ctx.redirect('/login')
 }

 module.exports={
     loginCheck,
     loginRedirect
 }