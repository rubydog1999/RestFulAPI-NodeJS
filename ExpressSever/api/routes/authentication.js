const router = require("express").Router();
const User = require('../model/User');
const {RegisterValidation, LoginValidation} = require('./validation');
const bcrypt = require('bcryptjs')
// npm install jsonwebtoken
const jwt = require('jsonwebtoken')
//npm install @hapi/joi
//validation
// const schema=Joi.object({  
//     name : Joi.string().min(6).required(),
//     email : Joi.string().min(6).required().email(),
//     password : Joi.string().min(6).required()
// });

router.post('/register',async(req,res)=>{
    //Validation
    const { error } = RegisterValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //Check if email already on the database
    const emailExist = await User.findOne({email:req.body.email})
    if (emailExist) return res.status(400).send('Email is already exist') 

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);
    //create new User
    const user = new User({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email: req.body.email,
        password: hashPassword,
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
        res.send({user: user._id})
    }catch(err){
        res.status(400).send(err);
    }
   
})
// write by PROMISE way
// router.post('/register',(req,res)=>{

//     const user = new User({
//         firstname : req.body.firstname,
//         lastname : req.body.lastname,
//         email: req.body.email,
//         password: hashPassword,
//     });
//     user.save()
//         .then(data=>{
//             res.json(data);
//         })
//         .catch(err=>{
//             res.json('wrong')
//         })
   
// })

//Login 
router.post('/login',async(req,res)=>{
    //Validation
    const { error } = LoginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
     //Check if email already on the database
        const emailExist = await User.findOne({email:req.body.email})
        if (!emailExist) return res.status(400).send('Email is not already exist') 
        //Password is correct or not
        const validPassword = await bcrypt.compare(req.body.password , emailExist.password)
        if(!validPassword) return res.status(400).send("Wrong Password")
    
    // Create and assign a token
    const token = jwt.sign({_id:emailExist._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token)
})


module.exports = router;