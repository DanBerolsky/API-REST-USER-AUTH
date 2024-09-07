const { isUserAuthenticated } = require("../../../models/UserModel");
const path = require("path");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  let user;
  const { email, password } = req.body;
  try {
    user =  await isUserAuthenticated(email, password)
  } catch (error) {
    return res.sendStatus(401)
  }
  if (user) {
    // Datos que quieres incluir en el token
    const payload = { ...req.body };

    // Clave secreta para firmar el token
    const secretKey = "mi_clave_secreta";

    // Opciones adicionales para el token
    const options = { expiresIn: "10m" };

    // Crear el token
    const token = jwt.sign(payload, secretKey, options);

    // Opciones básicas para la cookie
    const cookieOptions = {
      // No es necesario configurar httpOnly en desarrollo
      httpOnly: false, // En desarrollo, puede ser útil para depuración
      secure: false, // No usar HTTPS en desarrollo
      sameSite: "Lax", // Permite cookies en solicitudes de navegación cruzada (opcional en desarrollo)
      maxAge: 24 * 60 * 60 * 1000, // Cookie expira en 24 horas
    };

    return res.cookie('token', token, cookieOptions).redirect(303, "/v2/profile");
  }
  return res.sendStatus(401).end();
}

function getLogin(_, res) {
  res.render("index", () => {
    res.sendFile(path.resolve(__dirname, "../../../public/loginV2.html"));
  });
}

module.exports = {
  login,
  getLogin,
};
