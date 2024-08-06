const {findByUserId} = require('../database/UserModel')
const getProfile = (req, res) =>
{
    console.log(req.session);
    if(!req.session || !req.session.sessionId)return res.sendStatus(401)
    const sessionId = req.session.sessionId
    const user = findByUserId(sessionId)
    if(user){
        return res.send(`<span>Email: ${user.email}</span></br><span>pass: ${user.pwd}</span> </br>id: ${user.sessionId}</span></br><a href='/v1/login'>Logout</a>`)
    }
    return res.sendStatus(401)
}

module.exports = 
{
    getProfile
}