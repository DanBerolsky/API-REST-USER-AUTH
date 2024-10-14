import passport from "../../../passport/passport";
import { NextFunction, Request, Response } from "express";
import { UserAuthenticate } from "../../../types/user";
import { MESSAGES } from '../../../utils/messages';
import loginVx from "../../../public/loginVx";

function login(req: Request, res: Response, next: NextFunction) {
  passport.authenticate("local", (err: any, user: UserAuthenticate, info: { message: any; }) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });
    req.logIn(user, (err: any) => {
      if (err) return next(err);
      res.redirect("/v3/profile");
    });
  })(req, res, next);
}

function logOut(req: Request, res: Response) {
  req.logout((err: any) => {
    if (err) return res.status(500).json({ message: MESSAGES.AUTH.ERROR.LOGOUT_ERROR });
    res.redirect("/v3/login"); // Redirige al usuario para que vuelva a iniciar sesión
  });
}

function getLogin(_req: Request, res: Response) {
  res.send(loginVx("/v3/login"));
}

export {
  login,
  getLogin,
  logOut,
};
