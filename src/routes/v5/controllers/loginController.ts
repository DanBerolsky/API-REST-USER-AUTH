import { Request, Response } from "express";
import { MESSAGES } from "../../../utils/messages";
import loginVx from "../../../public/loginVx";

function logOut(req: Request, res: Response) {
  req.logout((err: any) => {
    if (err)
      return res
        .status(500)
        .json({ message: MESSAGES.AUTH.ERROR.LOGOUT_ERROR });
    res.redirect("/v5/login"); // Redirige al usuario para que vuelva a iniciar sesión
  });
}

function getLogin(_req: Request, res: Response) {
  res.send(loginVx("/v5/login","Microsoft"))
}

export { getLogin, logOut };
