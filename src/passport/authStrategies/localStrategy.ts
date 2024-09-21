import { Strategy as LocalStrategy } from "passport-local";
import { findById, findByEmail } from "../../models/UserModel";
import bcrypt from "bcrypt";

interface User {
  id?: number;
  email?: string;
  password?: string;
  token?: string;
  sessionId?: string;
}

// Configuración de la estrategia local
export const localStrategy = new LocalStrategy(
  { usernameField: "email" },
  async (username, password, done) => {
    try {
      const user: User | null = await findByEmail(username);
      if (!user) {
        return done(null, false, { message: "No user found." });
      }
      if (!user.password) {
        return done(null, false, { message: "User does not have a password" });
      }
      try {
        const isMatch = await bcrypt.compare(password, user.password);
        //const isMatch = password === user.password
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password." });
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
  done: (arg0: any, arg1: any) => void
) {
  return done(null, user.id);
}

// Función de deserialización del usuario
export async function deserializeUser(
  id: any,
  done: (arg0: unknown, arg1: boolean | User) => any
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
