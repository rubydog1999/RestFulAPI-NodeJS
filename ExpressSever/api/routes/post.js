const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');
const { post } = require('./authentication');
router.get('/',verify,(req,res)=>{
    res.json({
        post:{
            title:'my first post',
            decription: "hihi"
        }
    });
}); 
//Update User
router.put('/update',verify,async(req,res)=>{
    try{
        const UpdateUser = await User.updateOne({email:req.body.email},
            { 
                //Update time
                $currentDate:
                { "lastModified": true ,
                "dateupdate": { $type: "date" }
            },
            //Update element
            $set:{
                firstname: req.body.firstname,lastname: req.body.lastname}
           
        },
            );
        res.json(UpdateUser)
        res.send("user has been update")
        }catch(err){
            res.send('cant update')
        }
})

// DELETED USEr BY EMAIL
router.delete('/delete/',verify,async(req,res)=>{
    try{
    const removeUser = await User.remove({email:req.body.email});
    res.send("user has been deleted")
    }catch(err){
        res.send('cant remove')
    }
})
module.exports = router