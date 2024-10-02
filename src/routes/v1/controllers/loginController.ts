import { updateSessionId } from "../../../models/UserModel";
import path from "path";
import { nanoid } from "nanoid";
import { Request, Response } from "express";
import "express-session";
import { Session } from "express-session";
import { UserEmail, UserSession } from "../../../types/user";

async function login(req: Request, res: Response) {
  const newSessionId: string = nanoid();
  const session: Session = req.session as Session;
  session.sessionId = newSessionId;

  const { email } = req.user as UserEmail;

  if (typeof email !== "string") {
    return res.status(403).send({ message: "error session" });
  }

  // Guarda la nueva sesión en la base de datos
  let newUser: UserSession = { email, sessionId: newSessionId };
  try {
    await updateSessionId(newUser);
  } catch (error) {
    return res.status(500).send({ message: "Error interno del servidor" });
  }
  return res.redirect(303, "/v1/profile");
}

function logOut(req: Request, res: Response) {
  req.logout((err: any) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    req.session.destroy((err: any) => {
      if (err) {
        return res.status(500).send("Error destroying session");
      }
      res.redirect("/v1/login"); // Redirige a la página de inicio de sesión
    });
  });
}

function getLogin(_: Request, res: Response) {
  res.render("index", () => {
    res.sendFile(path.resolve(__dirname, "../../../public/login.html"));
  });
}

export { login, getLogin, logOut };
