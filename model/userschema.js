const jwt=require('jsonwebtoken')
const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')

const userschema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true

    },
    place: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    products:[
        {
            brandname: {
                type:String,
                required:true
            },
            productname:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            description:{
                type:String,
                required:true
            }
            
        }
    ]
    ,
    tokens:
        [{
            token: {
                type: String,
                required: true
            }
        }
        ]

})



userschema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

userschema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token })
        await this.save();
        return token;
    }
    catch (err) { 
        console.log("err")
    }
}

userschema.methods.addmethod = async function(brandname,productname,quantity,price,description){
    try{
        this.products = this.products.concat({brandname,productname,quantity,price,description})
        await this.save();
        return this.products;
        
    }
    catch(error){
console.log(error)
    }
}

const User = mongoose.model('USER', userschema)

module.exports = User;