/* const {
  isUserAuthenticated,
  updateSessionId,
} = require("../../../models/UserModel"); */
//var { nanoid } = require("nanoid");
const path = require("path");
const { passport } = require("../../../passport/passportConfig");

function login(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect("/v3/profile");
    });
  })(req, res, next);
}

function logOut(req, res) {
  req.logout((err) => {
    if (err) return res.status(500).send("Error al cerrar sesión");
    res.redirect("/v3/login"); // Redirige al usuario para que vuelva a iniciar sesión
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
  logOut,
};
