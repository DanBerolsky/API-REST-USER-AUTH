import { updateSessionId } from "../../../models/UserModel";
import { nanoid } from "nanoid";
import { Request, Response } from "express";
import "express-session";
import { Session } from "express-session";
import { UserEmail, UserSession } from "../../../types/user";
import { MESSAGES } from '../../../utils/messages';
import loginVx from "../../../public/loginVx";

async function login(req: Request, res: Response) {
  const newSessionId: string = nanoid();
  const session: Session = req.session as Session;
  session.sessionId = newSessionId;

  const { email } = req.user as UserEmail;

  // Guarda la nueva sesión en la base de datos
  let newUser: UserSession = { email, sessionId: newSessionId };
  try {
    await updateSessionId(newUser);
  } catch (error) {
    return res.status(500).json({message: MESSAGES.GENERAL.ERROR.INTERNAL_SERVER_ERROR});
  }
  return res.redirect(303, "/v1/profile");
}

function logOut(req: Request, res: Response) {
  req.logout((err: any) => {
    if (err) {
      return res.status(500).json({message: MESSAGES.AUTH.ERROR.LOGOUT_ERROR});
    }
    req.session.destroy((err: any) => {
      if (err) {
        return res.status(500).json({message: MESSAGES.AUTH.ERROR.SESSION_DESTROY_ERROR});
      }
      res.redirect("/v1/login"); // Redirige a la página de inicio de sesión
    });
  });
}

function getLogin(_: Request, res: Response) {
  res.send(loginVx("/v1/login"));
}

export { login, getLogin, logOut };
