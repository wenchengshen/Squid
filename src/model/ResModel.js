





/**
 * res的数据模型
 * **/


 class BaseModel{
     constructor({errno,data,message}){
         this.errno=errno;
         if(data){
             this.data=data
         }
         if(message){
             this.message=message
         }
     }
 }


 class SuccessModel extends BaseModel{
       constructor(data={}){
           super({
               errno:0,
               data
           })
       }
 }

 class FaliedModel extends BaseModel{
    constructor({errno,message}){
        super({
            errno,
            message
        })
    }
}


module.exports={
    FaliedModel,
    SuccessModel
}