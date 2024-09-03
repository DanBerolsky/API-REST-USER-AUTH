const { findBySessionId } = require("../../../models/UserModel");

async function getProfile(req, res) {
  
  //if (!req.session || !req.session.sessionId) return res.redirect("/v1/login");
  //const sessionId = req.session.sessionId;
  let user=req.user;
  if (user) {
    return res.send(
      `<span>Email: ${user.email}</span></br><span>pass: ${user.password}</span> </br><span>id: ${user.sessionId}</span></br><a href='/v1/login'>Logout</a>`
    );
  }
}

module.exports = {
  getProfile,
};
