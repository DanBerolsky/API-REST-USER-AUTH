const jwt = require("jsonwebtoken");
// Clave secreta para firmar el token
const SECRET_KEY = "mi_clave_secreta";

// Middleware para verificar el token
function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (token == null) return res.sendStatus(401); // No hay token

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // Token inválido
    user = { ...user, token: token };
    req.user = user;
    next(); // Token válido, continuar
  });
}

module.exports = authenticateToken;
