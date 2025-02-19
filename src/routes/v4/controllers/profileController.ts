import { Request, Response } from "express";
import User from "../../../types/user";
import maskHash from "../../../utils/maskHash";

async function getProfile(req: Request, res: Response) {
  //return res.json(req.user);
  const user = req.user as User;
  const { sessionId, token, ...userData } = user; //saco los datos sensibles
  return res.json({
    user: { ...userData, password: maskHash(user.password) },
    session:
      "La sesión se gestiona con express-session y Passport.js, utilizando cookies seguras para mantener la autenticación con Google OAuth.",
  });
}

export { getProfile };
