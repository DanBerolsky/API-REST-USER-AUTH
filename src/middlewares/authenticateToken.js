const jwt = require("jsonwebtoken");
// Clave secreta para firmar el token
const SECRET_KEY = "mi_clave_secreta";

// Middleware para verificar el token
async function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (token == null) return res.status(401).send({message:"no hay token"}); // No hay token
  
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send({message:"token inválido"}); // Token inválido
    user = { ...user, token: token };
    req.user = user;
    return next(); // Token válido, continuar
  });
}

module.exports = authenticateToken;
