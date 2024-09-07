const {
  isUserAuthenticated,
  updateSessionId,
} = require("../../../models/UserModel");
const path = require("path");
var { nanoid } = require("nanoid");

async function login(req, res) {
  let isAuthenticated = false;
  const { email, password } = req.body;
  
  try {
    isAuthenticated = await isUserAuthenticated(email, password);
  } catch (error) {
    return res.sendStatus(500);
  }

  if (isAuthenticated) {
    const newSessionId = nanoid();
    req.session.sessionId = newSessionId;
    // Guarda la nueva sesión en la base de datos
    let newUser = { ...req.body, sessionId: newSessionId };
    try {
      await updateSessionId(newUser);
    } catch (error) {
      return res.sendStatus(500);
    }
    return res.redirect(303, "/v1/profile");
  }
  return res.sendStatus(401).end();
}

function getLogin(_, res) {
  res.render("index", () => {
    res.sendFile(path.resolve(__dirname, "../../../public/login.html"));
  });
}

module.exports = {
  login,
  getLogin,
};
