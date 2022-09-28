const jwt = require("jsonwebtoken")

const User = require('../model/userschema')


const Authenticate = async (req, res, next) => {
    try {

        const token = req.cookies.tokenjwt


        console.log("cookie",req.cookies.tokenjwt)

        
        const verifyToken = jwt.verify(token,"dfajaevjofoherhaaejhacjloupqvotutqvutqvmiovmiotvqimtqviqvimqvitvqiuqtiuqtijk.qtvjklqvj.kvq/;qvjkqv;ijlqtvijasdfghjklpoiuytrewqzxcvbnmlkjhgfdsapoiuytrewqpoiuytrewq");



        const rootUser = await User.findOne({
            _id: verifyToken._id,
           
          });

        if (!rootUser) { throw new Error('User not found') }

        req.token = token;

        req.rootUser = rootUser;

        req.userID = rootUser._id;



        next();


    }
    catch (err) {
        res.status(401).send('Unauthorised: Token not found')
        console.log(err);
    }
}

module.exports = Authenticate