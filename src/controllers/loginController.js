const { checkEmailPwd } = require("../database/UserModel");
const path = require("path");

const login = (req, res) => {
  const userId = checkEmailPwd(req.body);
  if (userId !== "") {
    req.session.sessionId = userId;
    /* const hour = 3600000; */
    const fiveSeconds = 5000;
    req.session.cookie.expires = new Date(Date.now() + fiveSeconds);
    req.session.cookie.maxAge = fiveSeconds;
    return res.redirect(303, "/v1/profile");
  }
  return res.sendStatus(401).end();
};

const getLogin = (_, res) => {
  res.render("index", () => {
    res.sendFile(path.resolve(__dirname, "../public/login.html"));
  });
};

module.exports = {
  login,
  getLogin
};
