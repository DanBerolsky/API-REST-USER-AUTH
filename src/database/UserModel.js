const {users} = require("../database/db.json")

function findByUserId(userId){
    let finded = null
    let i = 0
    while(i<users.length && !finded){
        if(users[i]["sessionId"] === userId){
            finded = users[i]
        }
        i++
    }
    return finded
}

function checkEmailPwd(user){
    console.log(user);
    if (!user.email || !user.pwd) throw new Error(401)
    //console.log(`tiene email ${user.email} y pass ${user.pwd}`);
    const email = user.email
    const password = user.pwd
    let i = 0
    let finded = ""
    while(i < users.length){
        if(users[i]["email"] === email){
            if(users[i]["pwd"] === password){
                finded = users[i]["sessionId"]
            }
            i = users.length
        }
        i++
    }
    return finded
}

module.exports = 
{
    findByUserId,
    checkEmailPwd
}