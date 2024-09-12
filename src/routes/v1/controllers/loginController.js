const { updateSessionId } = require("../../../models/UserModel");
const path = require("path");
var { nanoid } = require("nanoid");

async function login(req, res) {
  const newSessionId = nanoid();
  req.session.sessionId = newSessionId;
  const {email} = req.user
  // Guarda la nueva sesión en la base de datos
  let newUser = { email, sessionId: newSessionId };
  try {
    await updateSessionId(newUser);
  } catch (error) {
    return res.status(500).send({message:"Error interno del servidor"});
  }
  return res.redirect(303, "/v1/profile");
}

function logOut(req, res) {
  req.logout((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Error destroying session');
      }
      res.redirect('/v1/login'); // Redirige a la página de inicio de sesión
    });
  });
}

function getLogin(_, res) {
  res.render("index", () => {
    res.sendFile(path.resolve(__dirname, "../../../public/login.html"));
  });
}

module.exports = {
  login,
  getLogin,
  logOut
};
