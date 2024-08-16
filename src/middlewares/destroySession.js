let destroySession = (req, _, next) =>
{
    req.session.sessionId = ""   
    next()
}

module.exports=
{
    destroySession
}
