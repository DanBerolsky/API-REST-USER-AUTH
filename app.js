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

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const login = require('./src/routes/v1/login')
const signup = require('./src/routes/v1/signup')
const profile = require("./src/routes/v1/profile")
app.use('/v1/login', login)
app.use('/v1/signup', signup)
app.use('/v1/profile', profile)

const loginV2 = require('./src/routes/v2/login')
const signupV2 = require('./src/routes/v2/signup')
const profileV2 = require("./src/routes/v2/profile")
app.use('/v2/login', loginV2)
app.use('/v2/signup', signupV2)
app.use('/v2/profile', profileV2)



app.get('/',(_,res)=>{
    res.redirect('/v1/login')
})

app.listen(PORT,()=>{
    console.log("http://localhost:"+PORT)
})