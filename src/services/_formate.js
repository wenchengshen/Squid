



const {DEFAULT_PICTURE}=require('../conf/constant')

function _formateUserPicture(obj){
  if(obj.picture === null){
      obj.picture = DEFAULT_PICTURE
  }
  return
}


function  formateUser(list){
   if(list===null){
       return list
   }
   if(list instanceof  Array){
       return  list,map(_formateUserPicture)
   }
   //单个对象
   return  _formateUserPicture(list)
}

module.exports={
    formateUser
}