const { findBySessionId } = require("../models/UserModel");

async function authSession(req, res, next) {
  const sessionId = req.session.sessionId;
  //console.log(sessionId);
  if (sessionId) {
    try {
      const user = await findBySessionId(sessionId);
      if (user) {
        req.user = user;
        return next();
      }
      return res.sendStatus(401);
    } catch (err) {
      // Manejar errores en la consulta
      console.error("Error during session authentication:", err);
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(401);
  }
}

module.exports = {authSession};
