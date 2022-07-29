const express= require('express')

const router = express.Router();

require("../db/conn");

const User=require("../model/userschema");

router.get('/',(req,res) =>{
    res.send('testing from backend router');
    });

router.post('/', async (req,res)=>{
const {name, email, password, place}=req.body;

    if(!name || !email || !password|| !place)
    {
        return res.status(422).json({error:"Enter the required fields"})
    }

    User.findOne({email:email})
    .then((userAlreadyExist)=>{
        if(userAlreadyExist){
            return res.status(422).json({error:"Email already Exist"});
        }
        const user=new User({name, email, password, place});

        user.save().then(()=>{
            res.status(201).json({message: "user details successfully saved"})
        }).catch((err)=>res.status(500).json({error:"failed to store the data"}))
    }).catch((err)=>{console.log(err);})
})

router.post('/login',async (req,res)=>{
        try{
            const {email, password} = req.body;
            if(!email || !password){
                return res.status(400).json({error:"Please Enter the data correctly"})
            }
            const userlogin= await User.findOne({email:email});
            if(!userlogin){
                res.status(400).json({message:"Error. Please check the entered details"})
            }
            else
            {
                res.json({message:"Sign-in successfull"})
            }
        }
        catch(err){
            console.log(err);
        }
})


module.exports = router;