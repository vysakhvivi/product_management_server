const mongoose=require('mongoose');
const DB=process.env.DATABASE;


mongoose.connect(DB,{
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true,
   
}).then(()=>{
    console.log('connection successfull');
}).catch((err)=>console.log('cant connect'))