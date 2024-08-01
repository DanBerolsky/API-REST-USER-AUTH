const {checkEmailPwd} = require("../database/UserModel")

const login = (req, res) =>
{
    const userId = checkEmailPwd(req.body)
    if(userId !== ""){
        req.session.sessionId = userId
        //return res.send(`<span>Logged in session</span></br></br><a href='/v1/profile'>Profile</a>`)
        return res.redirect(303,'/v1/profile')
    }
    return res.sendStatus(401).end()
}

module.exports = 
{
    login
}