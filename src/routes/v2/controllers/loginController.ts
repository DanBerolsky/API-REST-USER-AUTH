import path from "path";
import JWTHelper from '../../../helpers/JWTHelper';

async function login(req: any, res: any) {
  
  const { email, last_password_update } = req.user
  
  if (!last_password_update || !email) return res.status(500).send("Internal error");

  // Datos que quieres incluir en el token
  const payload = { email, last_password_update };

  // Opciones adicionales para el token
  const options = { expiresIn: "10m" };

  // Crear el token
  const token = new JWTHelper().sign(payload, options)

  // Opciones básicas para la cookie
  const cookieOptions = {
    // No es necesario configurar httpOnly en desarrollo
    httpOnly: false, // En desarrollo, puede ser útil para depuración
    secure: false, // No usar HTTPS en desarrollo
    sameSite: "Lax", // Permite cookies en solicitudes de navegación cruzada (opcional en desarrollo)
    maxAge: 24 * 60 * 60 * 1000, // Cookie expira en 24 horas
  };

  return res.cookie("token", token, cookieOptions).redirect(303, "/v2/profile");
}

function logOut(req: any, res: any) {
  //jwt blacklist*
  res.redirect("/v2/login"); // Redirige a la página de inicio de sesión
}

function getLogin(_: any, res: any) {
  res.render("index", () => {
    res.sendFile(path.resolve(__dirname, "../../../public/loginV2.html"));
  });
}

export{
  login,
  getLogin,
  logOut,
};
