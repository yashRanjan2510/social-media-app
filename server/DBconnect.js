const mongoose=require('mongoose')

module.exports= async ()=>{
    const mongouri="mongodb+srv://Yash2512:jGmSWKuNPfHZHptr@cluster0.aahid8f.mongodb.net/?retryWrites=true&w=majority"
    try{
       await mongoose.connect(mongouri,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log('mongodb connected')
    }
    catch(error){
         console.log(error)
         process.exit(1)
    }
} 
