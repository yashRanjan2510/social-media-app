
const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const { use } = require('../routers/authrouter')
const {error, success}=require('../utils/responsewrapper')
const signupcontroller = async(req,res)=>{
    try{     
    //res.send('from signup')
    const {email,password}=req.body
    if(!email || !password){
        return res.send(error(400,'All field are required'))
        //return res.status(400).send('All field are required')
    }
     const olduser=await User.findOne({email})
     if(olduser){
        return res.send(error(409,'user is already resistered'))

        //return res.status(409).send('user is already resistered')
     }    
     const hashedpassword=await bcrypt.hash(password,10)
     const user=await User.create({
        email,
        password:hashedpassword
     })

     // return res.status(201).json({user,})
     return res.send(success(201,{user}))
    }
    catch(error){
      console.log(error)
    }
}

const logincontroller = async(req,res)=>{
    try{
        const {email,password}=req.body
    if(!email || !password){
        return res.send(error(400,'All field are required'))  
        //return res.status(400).send('All field are required')
    }
     const user=await User.findOne({email})
     if(!user){
        return res.send(error(404,'user is not resistered'))
         //return res.status(404).send('user is not resistered')
     }  
    const matched=await bcrypt.compare(password, user.password)
    if(!matched){
        return res.send(error(403,'incorrect password'))
       // return res.status(403).send('incorrect password')
    }
    const accesstoken=generateaccesstoken({
        _id:user._id,
        email:user.email
    }) 

    const refreshtoken=generaterefreshstoken({
         _id:user._id,    
        email:user.email
    }) 
   
    res.cookie('jwt',refreshtoken,{
        httpOnly:true,
        secure:true
    })

//return res.json({accesstoken})
    return res.send(success(201,{accesstoken}))
    }
    catch(error){
 
    }
}          

// this api will   check the validity and generate new access token
const refreshaccesstokencontroller=async(req,res)=>{
      const cookies=req.cookies;
      if(!cookies.jwt){
        return res.send(error(401,'refresh token in cookies is required'))
        //return res.status(401).send('refresh token in cookie  is required')
      }

      const refreshtoken=cookies.jwt
      
      try{
        const decoded=jwt.verify(refreshtoken,process.env.REFRESH_TOKEN_PRIVATE_KEY)
        const _id=decoded._id
        const accesstoken=generateaccesstoken({_id})
        return res.send(success(201,{accesstoken}))
        //return res.status(201).json({accesstoken})
    }    
   
        
     catch(e){ 
         console.log(error)
         return res.send(error(401,'invalid access key'))
       // return res.status(401).send('invalid access key')
    }
}




//internal functions

const generateaccesstoken=(data) =>{ 
  try{
    const token= jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY,{expiresIn:"15m"})
    console.log(token )
    return token
  }  
  catch(error){
   console.log(error)
  }
}


const generaterefreshstoken=(data) =>{ 
    try{
      const token= jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY,{expiresIn:"1y"})
      console.log(token )
      return token
    }  
    catch(error){
          console.log(error)
    }
  }



module.exports={
    signupcontroller,
    logincontroller,
    refreshaccesstokencontroller 
}