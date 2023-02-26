const { success } = require("../utils/responsewrapper")

const gteallpostcontroller= async(req,res)=>{
    return res.send(success (200,'these are post') )
}

module.exports = {
    gteallpostcontroller
}