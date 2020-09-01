const express = require('express')
// npm install mongoose
// npm install dotenv to encoding 
const mongoose = require('mongoose')
// cài file config
const dotenv = require('dotenv')
dotenv.config();
//import Routes
const authRoute = require('./api/routes/authentication');
const postRoute = require('./api/routes/post');
// Create Express app
const app = express()
//Connect to DB get the url from mongo Atlas cloud
mongoose.connect(
    process.env.DB_CONNECT,
{ useUnifiedTopology: true},()=>console.log('connected to db'))

//Middlewares
app.use(express.json());
//Route Middlewares
app.use('/api/user',authRoute)
app.use('/api/posts',postRoute)

// Start the Express server
var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server running on http://%s:%s", host, port)
});
// app.listen(3000, () => console.log('Server running on port 3000!'))
