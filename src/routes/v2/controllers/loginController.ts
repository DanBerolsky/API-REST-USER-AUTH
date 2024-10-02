import path from "path";
import JWTHelper from "../../../helpers/JWTHelper";
import { UserPayload } from "../../../types/user";
import { Request, Response, CookieOptions } from "express";

async function login(req: Request, res: Response) {
  const { email, last_password_update } = req.user as UserPayload;

  if (!last_password_update || !email)
    return res.status(500).send("Internal error");

  // Datos que quieres incluir en el token
  const payload: UserPayload = { email, last_password_update };

  // Opciones adicionales para el token
  const options = { expiresIn: "1m" };

  try {
    // Crear el token
    const token = new JWTHelper().sign(payload, options);

    // Opciones básicas para la cookie
    const cookieOptions : CookieOptions  = {
      httpOnly: true, // Cambiar a true en producción
      secure: false, // Cambiar a true en producción si usas HTTPS
      sameSite: "lax", 
      maxAge: 24 * 60 * 60 * 1000, // Cookie expira en 24 horas
    };

    // Establecer la cookie y redirigir
    res.cookie("token", token, cookieOptions);
    return res.redirect(303, "/v2/profile");
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

function logOut(req: Request, res: Response) {
  //jwt blacklist*
  res.redirect("/v2/login"); // Redirige a la página de inicio de sesión
}

function getLogin(_req: Request, res: Response) {
  res.render("index", () => {
    res.sendFile(path.resolve(__dirname, "../../../public/loginV2.html"));
  });
}

export { login, getLogin, logOut };
