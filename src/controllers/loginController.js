const { checkEmailPwd } = require("../database/UserModel");

const login = (req, res) => {
  const userId = checkEmailPwd(req.body);
  if (userId !== "") {
    req.session.sessionId = userId;
    /* const hour = 3600000; */
    const fiveSeconds = 5000
    req.session.cookie.expires = new Date(Date.now() + fiveSeconds);
    req.session.cookie.maxAge = fiveSeconds;
    return res.redirect(303, "/v1/profile");
  }
  return res.sendStatus(401).end();
};

module.exports = {
  login,
};
