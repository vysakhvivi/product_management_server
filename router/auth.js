const express= require('express')

const router = express.Router();



router.get('/',(req,res) =>{
    res.send('testing from backend router');
    });

router.post('/',(req,res)=>{
const {name, email, password, place}=req.body;

    if(!name || !email || password|| place)
    {
        return res.status(422).json({error:"Enter the required fields"})
    }

})

module.exports = router;