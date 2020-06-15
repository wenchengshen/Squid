


const  crypto=require('crypto')

//mima
const SECRET_KEY='sd2323_3ui@'

function  _md5(content){
    const md5=crypto.createHash('md5')
    return md5.update(content).digest('hex');
}



function doCrypto(content){
    const str =`password=${content}&key=${SECRET_KEY}`
    return _md5(str)
}
module.exports = doCrypto





