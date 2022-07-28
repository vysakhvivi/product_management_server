const expresss= require('express')

const mongoose=require('mongoose')



const app = expresss();

const db='mongodb+srv://vysakhmnair:vysakhvivi007@cluster0.vns9c1c.mongodb.net/product?retryWrites=true&w=majority'




mongoose.connect(db,{
    
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true,
   
}).then(()=>{
    console.log('connection successfull');
}).catch((err)=>console.log('cant connect'))


const middleware=(req,res,next)=>{
console.log('middleware')
}

middleware();

app.get('/',(req,res) =>{
res.send('testing from backend')
});

app.listen(3000,()=>{
    console.log('server is running at port 3000');
})