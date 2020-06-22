/**
 * @description  
 * @author wencs
 * 
 * **/
const {SuccessModel,FaliedModel} =require('../model/ResModel')

const  fsErta = require('fs-extra')




const path=require('path')

const DIST_FOLDER_PATH=path.join(__dirname,'..','..','uploadFiles')

 const MIX_SIZE=1024*1024*1024 //1M


//是否需要创建目录
fsErta.pathExists(DIST_FOLDER_PATH).then(exist=>{
    if(!exist){
        fsErta.ensureDir(DIST_FOLDER_PATH)
    }
})


 async   function  saveFile({name,type,size,filePath}){
   if(size>MIX_SIZE){
       //不存在的删除文件
      await fsErta.remove(filePath)
       return new  FaliedModel({
           errno:1009,
           message:"文件过大"
       })
   }
    //移动文件
    const fileName=Date.now()+'.'+name //
    const distFilePath =path.join(DIST_FOLDER_PATH,fileName)
    await fsErta.move(filePath,distFilePath)

    return  new SuccessModel({
        url:'/'+fileName
    })
 }

 module.exports={
     saveFile
 }