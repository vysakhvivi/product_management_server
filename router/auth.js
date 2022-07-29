const express = require('express')

const router = express.Router();

const bcrypt = require('bcryptjs')

const jwt= require('jsonwebtoken')

require("../db/conn");

const User = require("../model/userschema");

router.get('/', (req, res) => {
    res.send('testing from backend router');
});

router.post('/', async (req, res) => {
    const { name, email, password, place } = req.body;

    if (!name || !email || !password || !place) {
        return res.status(422).json({ error: "Enter the required fields" })
    }

    User.findOne({ email: email })
        .then((userAlreadyExist) => {
            if (userAlreadyExist) {
                return res.status(422).json({ error: "Email already Exist" });
            }
            const user = new User({ name, email, password, place });

            user.save().then(() => {
                res.status(201).json({ message: "user details successfully saved" })
            }).catch((err) => res.status(500).json({ error: "failed to store the data" }))
        }).catch((err) => { console.log(err); })
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please Enter the data correctly" })
        }
        const userlogin = await User.findOne({ email: email });

        if (userlogin) {
            const samepass = await bcrypt.compare(password, userlogin.password);
        
            const token = await userlogin.generateAuthToken();

            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+3000000000),
                httpOnly:true
            })

            if (samepass) {
                res.status(200).json({ message: "Successfully signed-in" })
            }
            else{
                res.status(400).json({error:"Invalid data"})
            }
        }
        else {
            res.status(400).json({ error: "Please check the entered data" })
        }



    }
    catch (err) {
        console.log(err);
    }
})


module.exports = router;