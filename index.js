const express = require('express')
const app = express()
require('dotenv').config()
require('./models/db')
const cors = require("cors")
const authRouter = require('./routes/AuthRouter')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8080
app.get('/ping' , (req,res)=>{
    res.send('pong')
})
app.use(bodyParser.json())
app.use(cors())
app.use('/auth', authRouter)
app.listen (PORT, ()=>{
    console.log((`server is running on ${PORT}..`));
    
})