import { Strategy as LocalStrategy } from "passport-local";
import { findByEmail } from "../../models/UserModel";
import bcrypt from "bcrypt";
import { MESSAGES } from "../../utils/messages"; // Asegúrate de la ruta correcta
import User from "../../types/user";

// Configuración de la estrategia local
export const localStrategy = new LocalStrategy(
  { usernameField: "email" },
  async (username, password, done) => {
    try {
      const user: User | null = await findByEmail(username);
      if (!user) {
        return done(null, false, {
          message: MESSAGES.AUTH.ERROR.USER_NOT_FOUND,
        }); // Mensaje de usuario no encontrado
      }
      if (!user.password) {
        return done(null, false, { message: MESSAGES.AUTH.ERROR.NO_PASSWORD }); // Mensaje de que el usuario no tiene contraseña
      }
      try {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: MESSAGES.AUTH.ERROR.INCORRECT_PASSWORD,
          }); // Mensaje de contraseña incorrecta
        }
      } catch (error) {
        console.error("bcrypt error");
        return done(error);
      }
    } catch (error) {
      console.error("findByEmail error");
      return done(error);
    }
  }
);
