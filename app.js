const dotenv=require("dotenv")

const express= require('express')
dotenv.config({path:'./config.env'})

require('./db/conn')


const mongoose=require('mongoose')

const User=require('./model/userschema')

const app = express();

app.use(express.json());

app.use(require('./router/auth'))





const PORT=process.env.PORT


const middleware=(req,res,next)=>{
console.log('middleware')
}

middleware();

app.get('/',(req,res) =>{
res.send('testing from backend')
});

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
})