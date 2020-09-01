const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')
const checkRoute = require('./middlewarecheckvalid')
app.use(express.json());
app.use('/api/user/',checkRoute)
const User = [
    {
    id:1 ,
    userName:'rubydog99',
    password: '123456',
    },
    {
        id:2 ,
        userName:'gunner99',
        password: '123456923',
    }

];
app.get('/',(req,res)=>{
    res.send('Hello world');
})
app.get('/api/user', (req,res)=>{
    res.send(User);
})
app.get('/api/user/:id', (req,res)=>{
    const users = User.find(c=> c.id === parseInt(req.params.id));
    if (!users) return res.status(404).send(' not found user given ID')
    res.json(users)
})
app.post('/api/user/register',(req,res)=>{
    const users = { 
        id: User.length+1,
        userName : req.body.userName,
        password : req.body.password
    }
    User.push(users);
    res.send(users);
})
app.post('/api/user/login',(req,res)=>{
    const userNameExist = User.find(c=> c.userName == req.body.userName);
    if(!userNameExist) res.status(404).send('Username not exsist');
    const passwordExist = User.find(a=> a.password == req.body.password);
    if(!passwordExist) res.status(404).send('Password not exsist');
    const token = jwt.sign({ foo: 'bar' }, 'shhhhh');
    res.header('auth-token',token).send(token)
})
app.put('/api/user/fix',(req,res)=>{
    const user = User.find(c=> c.id === parseInt(req.body.id));
    if(!user) res.status(404).send("User not exist")
    user.userName = req.body.userName
    user.password = req.body.password
    res.send(user)
})
app.delete('/api/user/:id',(req,res)=>{
    const user = User.find(c=> c.id === parseInt(req.params.id));
    if(!user) res.status(404).send("User not exist")

    const index= User.indexOf(user);
    User.splice(index,1);
    res.send(User);
})
const sever = app.listen(2000,()=> console.log('server is running '))
module.exports = sever;