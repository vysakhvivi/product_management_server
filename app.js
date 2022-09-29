const dotenv=require("dotenv")

const cors=require('cors')

const express= require('express')
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())


dotenv.config({path:'./config.env'})

require('./db/conn')

app.use(cors({
    origin:"http://localhost:3000",credentials:true
}))


    

const mongoose=require('mongoose')

const User=require('./model/userschema')


app.use(express.json());

app.use(require('./router/auth'))


const PORT=process.env.PORT



app.get('/',(req,res) =>{
res.send('testing from backend')
});



app.post('/', async (req,res)=>{
    res.send('testing post')
})

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
})