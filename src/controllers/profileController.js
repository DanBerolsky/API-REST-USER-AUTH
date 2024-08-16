const { findByUserId } = require("../models/UserModel");
function getProfile(req, res) {
  if (!req.session || !req.session.sessionId) return res.redirect("/v1/login");
  const sessionId = req.session.sessionId;
  const user = findByUserId(sessionId);
  if (user) {
    return res.send(
      `<span>Email: ${user.email}</span></br><span>pass: ${user.pwd}</span> </br><span>id: ${user.sessionId}</span></br><a href='/v1/login'>Logout</a>`
    );
  }
}

module.exports = {
  getProfile,
};
