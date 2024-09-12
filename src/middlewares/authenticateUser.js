const { findByEmail } = require("../models/UserModel");
const bcrypt = require('bcrypt')

async function authenticate(req, res, next) {
  let found = null;
  const { email, password } = req.body;

  try {
    found = await findByEmail(email);
  } catch (error) {
    return res.status(500).send({ message: "Error interno del servidor" });
  }
  
  if (!found) return res.status(401).send({ message: "Usuario no encontrado" });
  
  const isMatch = await bcrypt.compare(password, found.password);
  
  if (isMatch) {
    req.user = { email };
    return next();
  } else {
    return res.status(401).send({ message: "Contraseña incorrecta" });
  }
}

module.exports = authenticate;
