import { addUser, findByEmail } from "../models/UserModel";
import User, { UserSignup } from "../types/user";

export default async function fetchUserOrRegister(email: string, done:any) {
  try {
    let user: User | UserSignup | null = await findByEmail(email);
    if (!user) {
      user = { email: email, password: "" } as UserSignup;
      await addUser(user);
      user = await findByEmail(email);
    }
    if (!user) {
      throw new Error("No se pudo crear o encontrar el usuario");
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}