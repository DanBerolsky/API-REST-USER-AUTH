import { NextFunction, Request, Response } from "express";
import User, { UserAuthenticate } from "../types/user";
import bcrypt from "bcrypt"
import { findByEmail } from "../models/UserModel";
import { MESSAGES } from "../utils/messages"; // Asegúrate de que la ruta sea correcta    

async function authenticate(req: Request, res: Response, next: NextFunction) {
  let found: User | null = null;
  const { email, password } = req.body as UserAuthenticate;

  try {
    found = await findByEmail(email);
    if (!found) {
      console.error("ERROR: User not found");
      return res.status(401).send({ message: MESSAGES.AUTH.ERROR.USER_NOT_FOUND });
    } 
    if (!found.confirmedEmail) {
      console.error("ERROR: Email not confirmed");
      return res.status(401).send({ message: MESSAGES.AUTH.ERROR.EMAIL_NOT_CONFIRMED });
    }

    try {
      const isMatch = await bcrypt.compare(password, found.password);
      if (!isMatch) {
        console.error("ERROR: Incorrect password");
        return res.status(401).send({ message: MESSAGES.AUTH.ERROR.INCORRECT_PASSWORD });
      }

      //const { last_password_update } = found;
      //req.user = { email, last_password_update };
      req.user = found;
      return next();
    } catch (error) {
      console.error("ERROR: Bcrypt error", error);
      return res.status(500).send({ message: MESSAGES.GENERAL.ERROR.INTERNAL_SERVER_ERROR });
    }
  } catch (error) {
    console.error("ERROR: Internal server error", error);
    return res.status(500).send({ message: MESSAGES.GENERAL.ERROR.INTERNAL_SERVER_ERROR });
  }
}

export default authenticate;
