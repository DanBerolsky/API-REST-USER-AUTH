import JWTHelper from "../../../helpers/JWTHelper";
import { UserPayload } from "../../../types/user";
import { CookieOptions, Request, Response} from "express";
import { options, cookieOptions } from "../../../config/JWT";
import { SignOptions } from "jsonwebtoken";
import { MESSAGES } from '../../../utils/messages';
import loginVx from "../../../public/loginVx";

async function login(req: Request, res: Response) {
  const { email, last_password_update } = req.user as UserPayload;

  // Datos que quieres incluir en el token
  const payload: UserPayload = { email, last_password_update };

  try {
    // Crear el token
    const token = new JWTHelper(process.env.JWT_SECRET_KEY).sign(payload, options as SignOptions);

    // Establecer la cookie y redirigir
    res.cookie("token", token, cookieOptions as CookieOptions);

    return res.redirect(303, "/v2/profile");
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({message: MESSAGES.GENERAL.ERROR.INTERNAL_SERVER_ERROR});
  }
}

function logOut(req: Request, res: Response) {
  //jwt blacklist*
  res.redirect("/v2/login"); // Redirige a la página de inicio de sesión
}

function getLogin(_req: Request, res: Response) {
  res.send(loginVx("/v2/login"));
}

export { login, getLogin, logOut };
