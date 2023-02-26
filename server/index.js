const express=require('express')
const dotenv=require('dotenv')
const DBconnect=require('./DBconnect')
const cookieparser=require('cookie-parser')
const cors=require('cors')


const app=express()

//middleware
const morgan=require('morgan')
app.use(morgan('common'))
app.use(express.json())
app.use(cookieparser())
app.use(cors({
    credentials:true,
    origin:"http://localhost:3000"
}))

const authrouter=require('./routers/authrouter')
const postrouter=require('./routers/postrouter')

dotenv.config('./.env')





app.use('/auth',authrouter) 
app.use('/post',postrouter)
const PORT= process.env.PORT || 4000

app.get('/',(req,res)=>{
    res.status(200).send('ok from server ')
})
DBconnect()
app.listen(PORT ,  ()=>{  
    console.log(`listning on port: ${PORT}`)
})