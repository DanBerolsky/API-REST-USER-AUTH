let destroySession = (req, _, next) =>
{
    req.session.sessionId = ""   
    return next()
}

module.exports=
{
    destroySession
}
