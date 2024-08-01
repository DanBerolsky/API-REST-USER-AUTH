const express = require('express')
const router = express.Router()
const {bodyParserJson} = require('../../helpers/jsonBodyParser.js')
bodyParserJson(router)
//let session = require('express-session')
const fs = require('fs')    
const db = require("../../database/db.json")
var { nanoid } = require("nanoid");

//router.get('/',(req,res)=>{res.send('<h1>singup</h1>')})

function addUser(newUser, sessionId){
    db['users'].push({...newUser,'sessionId':sessionId});
    jsonStr = JSON.stringify(db);
    console.log(jsonStr);
    fs.writeFile('db.json',jsonStr,(err)=>{
        if (err) {
            throw err
        }
        console.log("");
    })

}

function findByEmail(users,email){
    let finded = false
    let i = 0
    while(i<users.length && !finded){
        if(users[i]["email"] === email){
            finded = true
        }
        i++
    }
    return finded
}

router.post('/',async (req,res)=>{
    const postUser = req.body
    const {email,pwd} = postUser
    const users = db["users"]
    if(!email || !pwd) return res.sendStatus(400)
    if(!findByEmail(users, email)){
        const sessionId = nanoid()
        addUser(postUser, sessionId)
        res.send()
    }else{
        res.sendStatus(401)
    }
})

module.exports = router