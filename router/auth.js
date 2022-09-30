const express = require('express')

const router = express.Router();

const bcrypt = require('bcryptjs')

const User = require("../model/userschema");

const jwt= require('jsonwebtoken')

const cookieparser= require('cookie-parser')

router.use(cookieparser())


require("../db/conn");


const authenticate=require('../middleware/authenticate')



router.get('/', (req, res) => {
    res.send('testing from backend router');
});

router.post('/register', async (req, res) => {
    const {username,email,place,password} = req.body;

    if (!username || !email || !place || !password) {
        return res.status(401).json({ error: "Enter the required fields" })
    }

    User.findOne({ email: email })
        .then((userAlreadyExist) => {
            if (userAlreadyExist) {
                return res.status(422).json({ error: "Email already Exist" });
            }
            const user = new User({ username, email, password, place });

            user.save().then(() => {
                res.status(201).json({ message: "user details successfully saved" })
            }).catch((err) => res.status(500).json({ error: "failed to store the data" }))
        }).catch((err) => { console.log(err); })
})

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please Enter the data correctly" })
        }
        const userlogin = await User.findOne({ email: email });

        if (userlogin) {
            const samepass = await bcrypt.compare(password, userlogin.password);
        
            const token = await userlogin.generateAuthToken();

            res.cookie("tokenjwt",token,{
                httpOnly:true
            })

            

            if (samepass) {
                
                res.status(200).json(userlogin)
                console.log("userlogin: ",userlogin)

                      
            }
            else{
                res.status(400).json({error:"Invalid data"})
            }
        }
        else {
            res.status(406).json({ error: "Please check the entered data" })
        }



    }
    catch (err) {
        console.log(err);
    }
})

router.get('/homepage', async (req,res)=>{
    console.log('home page')
})

router.post('/addproduct', async (req,res)=>{
    try{

    const {brandname,productname,quantity,price,description,email}=req.body;

        
    
        const rootuser = await User.findOne({'email':email})

        console.log("email is ",email)

        console.log("root user is ", rootuser)

        

        if(!rootuser) 
        {
            res.json({error:"please fill the product details "})
        }
        else
        {
            const addprod = await  rootuser.addmethod(brandname,productname,quantity,price,description)

            await rootuser.save();

            res.status(201).json({message:"Product succesffuly saved"})
        }

    }
    catch(err){
res.status(401).send('Error In Adding the data')
console.log(err)
    }
})

router.get('/listproduct', async  (req,res) =>{
    
            const username=req.query.username
            console.log(username)
            const rootuser = await User.findOne({'username':username})

            console.log(rootuser)
            if(!rootuser){
                res.status("User not found")
            }
            else{
                res.status(200).send(rootuser)
                console.log(rootuser)
            }

})


// router.get('./addproduct',async (req,res)=>{
//     try{
//      const {brandname,productname,picture,quantity,price,description} = req.body;

//      if(!brandname || !productname || !picture || !quantity || !price || !description )
//      return res.json({error:"Please Fill all the Forms"})


//     }
//     catch(error){

//     }


// })



module.exports = router;