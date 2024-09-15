const { findByEmail } = require("../models/UserModel");
const jwt = require("jsonwebtoken");
// Clave secreta para firmar el token
const SECRET_KEY = "mi_clave_secreta";

// Middleware para verificar el token
async function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({ message: "no hay token" });// No hay token
  } 

  jwt.verify(token, SECRET_KEY, async (err, user) => {
    if (err) {
      return res.status(403).send({ message: "token inválido" }); // Token inválido
    }
    const { email, last_password_update } = user;
    const found = await findByEmail(email);
    
    if (!found) {
      return res.status(401).send({ message: "token inválido" }); //no existe el user
    }
    const newPassword = found.last_password_update === last_password_update
    if (!newPassword) {
      return res.status(401).send({ message: "token inválido" }); //cambio la pwd
    }

   
    user = { ...user, token: token };
    req.user = user;
    return next(); // Token válido, continuar
  });
}

module.exports = authenticateToken;
