const { findByEmail } = require("../models/UserModel");
const bcrypt = require("bcrypt");

async function authenticate(req, res, next) {
  let found = null;
  const { email, password } = req.body;
  
  try {
    found = await findByEmail(email);
    if (!found) {
      console.error("ERROR");
      return res.status(401).send({ message: "Usuario no encontrado" });
    }
    try {
      const isMatch = await bcrypt.compare(password, found.password);
      if (!isMatch) {
        console.error("ERROR");
        return res.status(401).send({ message: "Contraseña incorrecta" });
      }
      
      const { last_password_update } = found;
      req.user = { email, last_password_update }; 
      return next();
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Error bcrypt" });
    }
  } catch (error) {
    console.error("ERROR : ", error);
    return res.status(500).send({ message: "Error interno del servidor" });
  }
}

module.exports = authenticate;
