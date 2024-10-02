import path from "path";
import passport from "../../../passport/passportConfig";
import { NextFunction, Request, Response } from "express";
import { UserAuthenticate } from "../../../types/user";


function login(req:Request, res:Response, next: NextFunction) {
  passport.authenticate("local", (err: any, user: UserAuthenticate, info: { message: any; }) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });
    req.logIn(user, (err: any) => {
      if (err) return next(err);
      res.redirect("/v3/profile");
    });
  })(req, res, next);
}

function logOut(req:Request, res:Response) {
  req.logout((err: any) => {
    if (err) return res.status(500).send("Error al cerrar sesión");
    res.redirect("/v3/login"); // Redirige al usuario para que vuelva a iniciar sesión
  });
}

function getLogin(_req:Request, res:Response) {
  res.render("index", () => {
    res.sendFile(path.resolve(__dirname, "../../../public/login.html"));
  });
}

export{
  login,
  getLogin,
  logOut,
};
