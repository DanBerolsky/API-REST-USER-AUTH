/* const {
  isUserAuthenticated,
  updateSessionId,
} = require("../../../models/UserModel"); */
//var { nanoid } = require("nanoid");
import path from "path";
import passport from "../../../passport/passportConfig";


function login(req:any, res:any, next: (arg0: any) => any) {
  passport.authenticate("local", (err: any, user: any, info: { message: any; }) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });
    req.logIn(user, (err: any) => {
      if (err) return next(err);
      res.redirect("/v3/profile");
    });
  })(req, res, next);
}

function logOut(req:any, res:any) {
  req.logout((err: any) => {
    if (err) return res.status(500).send("Error al cerrar sesión");
    res.redirect("/v3/login"); // Redirige al usuario para que vuelva a iniciar sesión
  });
}

function getLogin(_: any, res:any) {
  res.render("index", () => {
    res.sendFile(path.resolve(__dirname, "../../../public/login.html"));
  });
}

export{
  login,
  getLogin,
  logOut,
};
