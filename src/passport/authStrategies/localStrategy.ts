import { Strategy as LocalStrategy } from "passport-local";
import { findById, findByEmail } from "../../models/UserModel";
import bcrypt from "bcrypt";
import { MESSAGES } from '../../utils/messages'; // Asegúrate de la ruta correcta
import User from "../../types/user";
import { DoneCallback } from "passport";


// Configuración de la estrategia local
export const localStrategy = new LocalStrategy(
  { usernameField: "email" },
  async (username, password, done) => {
    try {
      const user: User | null = await findByEmail(username);
      if (!user) {
        return done(null, false, { message: MESSAGES.AUTH.ERROR.USER_NOT_FOUND }); // Mensaje de usuario no encontrado
      }
      if (!user.password) {
        return done(null, false, { message: MESSAGES.AUTH.ERROR.NO_PASSWORD }); // Mensaje de que el usuario no tiene contraseña
      }
      try {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: MESSAGES.AUTH.ERROR.INCORRECT_PASSWORD }); // Mensaje de contraseña incorrecta
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

// Función de serialización del usuario
export function serializeUser(
  user: { id?: any },
  done: DoneCallback){
  return done(null, user.id);
}

// Función de deserialización del usuario
export async function deserializeUser(
  id: any,
  done: DoneCallback
) {
  if (!id) return done(null, false);
  try {
    const user: User | null = await findById(id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    console.error("Error during deserialization:", error);
    return done(error, false);
  }
}