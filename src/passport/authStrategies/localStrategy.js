const LocalStrategy = require("passport-local").Strategy;
const { findById, findByEmail } = require("../../models/UserModel");
const bcrypt = require("bcrypt");

// Configuración de la estrategia local
const localStrategy = new LocalStrategy(
  { usernameField: "email" },
  async (username, password, done) => {
    try {
      const user = await findByEmail(username);
      if (!user) return done(null, false, { message: "No user found." });
      const isMatch = await bcrypt.compare(password, user.password);
      //const isMatch = password === user.password
      if (isMatch) return done(null, user);
      else return done(null, false, { message: "Incorrect password." });
    } catch (error) {
      return done(error);
    }
  }
);

// Función de serialización del usuario
function serializeUser(user, done) {
  done(null, user.id);
}

// Función de deserialización del usuario
async function deserializeUser(id, done) {
  if (!id) return done(null, false);
  try {
    const user = await findById(id);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (error) {
    console.error('Error during deserialization:', error);
    return done(error);
  }
}

module.exports = { localStrategy, serializeUser, deserializeUser };
