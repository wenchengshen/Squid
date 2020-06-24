



const {
    DEFAUT_PICTURE
} = require('../conf/constant')

function _formateUserPicture(obj){
      console.log(obj, "obj1")
  if(obj.picture === null){
      obj.picture = DEFAUT_PICTURE
  }
  return obj
}


function  formateUser(list){
   if(list===null){
       return list
   }
   console.log(list,"list1")
   if(list instanceof  Array){
       return  list.map(_formateUserPicture)
   }
   //单个对象
   return  _formateUserPicture(list)
}

function formateBlog(list){

}


module.exports={
    formateUser,
    formateBlog
}