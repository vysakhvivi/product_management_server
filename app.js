const dotenv=require("dotenv")


const cors=require('cors')

const express= require('express')
const app = express();
dotenv.config({path:'./config.env'})

require('./db/conn')

app.use(cors())


const mongoose=require('mongoose')

const User=require('./model/userschema')



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

app.post('/', async (req,res)=>{
    res.send('testing post')
})

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
})