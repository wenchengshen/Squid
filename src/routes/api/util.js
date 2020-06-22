
/**
 * @description
 * @author wencs
 *
 * **/


const router=require('koa-router')()
const opstions=require('formidable-upload-koa')
const {SuccessModel,FaliedModel} =require('../../model/ResModel')
const {saveFile} =require('../../controller/until')

router.prefix('/api/utils')


router.post('/upload',opstions(),async (ctx,next)=>{
    

    const file=ctx.req.files['file']
    if (!file){
        ctx.body=new FaliedModel({
            errno:1009,
            message:"文件不能为空"
        })
        return 
    }

    const {size,path,name,type}=file

    ctx.body= await saveFile({
         name,
         type,
         size,
         filePath:path
    })
})

module.exports=router



