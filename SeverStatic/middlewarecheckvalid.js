const router = require('express').Router();
const verify = require('./verifytoken');
const User = [
    {
    id:1 ,
    userName:'rubydog99',
    password: '123456',
    },
    {id:2 ,
        userName:'gunner99',
        password: '123456923',
    }

];
router.get('/check',verify,(req,res)=>{
    res.json({
        post:{
            title:'my first post',
            decription: "hihi"
        }
    });
}); 
module.exports = router