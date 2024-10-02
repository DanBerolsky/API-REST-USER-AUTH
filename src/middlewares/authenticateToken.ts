import { findByEmail } from "../models/UserModel";
import JWTHelper from "../helpers/JWTHelper";
import User, { UserJWTRequest } from "../types/user";
import {UserPayload} from "../types/user";
import { Request, Response, NextFunction } from "express";

// Middleware para verificar el token
export default async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({ message: "no hay token" }); // No hay token
  }

  new JWTHelper().verify(token, async (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "token inválido" }); // Token inválido
    }
    if (!decoded) {
      return res.status(403).send({ message: "token inválido" }); // Token inválido
    }

    const { email, last_password_update} = decoded as UserPayload;
    const found: null | User = await findByEmail(email);

    if (!found) {
      return res.status(401).send({ message: "token inválido" }); //no existe el user
    }
    const newPassword = found.last_password_update === last_password_update;
    if (!newPassword) {
      return res.status(401).send({ message: "token inválido" }); //cambio la pwd
    }
    const user: UserJWTRequest = { ...found, token: token };
    req.user = user;
    return next(); // Token válido, continuar
  });
}
