import { DoneCallback } from "passport";
import User from "../types/user";
import { findById } from "../models/UserModel";

// Función de serialización del usuario
export function serialize(user: { id?: any }, done: DoneCallback) {
  console.log("ser");

  return done(null, user.id);
}

// Función de deserialización del usuario
export async function deserialize(id: any, done: DoneCallback) {
  console.log("des");

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
