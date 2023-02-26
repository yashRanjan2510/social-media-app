const jwt=require('jsonwebtoken')
const {error}=require('../utils/responsewrapper')
module.exports=async(req,res,next)=>{
    // console.log('i am insde middleware')
    // next();
    if(!req.headers || 
        !req.headers.authorization ||
         !req.headers.authorization.startsWith("Bearer"))
     {
        return res.send(error(401,'authoriation header is required'))
        //return res.status(401).send('authoriation header is required')
     }
    const accesstoken=req.headers.authorization.split(" ")[1]
    

    try{
        const decoded=jwt.verify(accesstoken,process.env.ACCESS_TOKEN_PRIVATE_KEY)
         req._id=decoded._id
         next()
    }
    
    catch(e){
         console.log(e)
          return res.send(error(401,'invalid access key'))
       // return res.status(401).send('invalid access key')
    }
    next()
    }