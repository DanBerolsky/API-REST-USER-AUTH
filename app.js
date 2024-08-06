const express = require('express')
const app = express()
const PORT = process.env.PORT || 3033
const session = require('express-session')
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

const login = require('./src/v1/routes/login')
const signup = require('./src/v1/routes/signup')
const profile = require("./src/v1/routes/profile")
app.use('/v1/login', login)
app.use('/v1/signup', signup)
app.use('/v1/profile', profile)


/* app.get('/',(_,res)=>{
    res.send('index')
})
 */
app.listen(PORT,()=>{
    console.log("http://localhost:"+PORT)
})