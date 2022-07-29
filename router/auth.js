const express= require('express')

const router = express.Router();

router.get('/',(req,res) =>{
    res.send('testing from backend router');
    });

router.post('/',(req,res)=>{
    console.log(req.body);
    res.json({message:req.body})
   
})

module.exports = router;