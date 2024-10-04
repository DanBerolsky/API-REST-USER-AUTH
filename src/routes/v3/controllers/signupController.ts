import path from "path";
import { findByEmail, addUser } from "../../../models/UserModel";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { UserSignup } from "../../../types/user";
import { MESSAGES } from '../../../utils/messages';

async function signupAction(req: Request, res: Response) {
  const { email, password } = req.body as UserSignup;

  try {
    // Comprobar si el usuario ya existe
    if (!(await findByEmail(email))) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser: UserSignup = { email, password: hashedPassword };
      await addUser(newUser);
      return res.redirect(303, "/v1/login"); // Redirección después de un registro exitoso
    } else {
      return res.status(409).json({ error: MESSAGES.AUTH.ERROR.EMAIL_TAKEN }); // Mensaje para email ya en uso
    }
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ error: MESSAGES.GENERAL.ERROR.INTERNAL_SERVER_ERROR }); // Mensaje de error interno
  }
}

function signupForm(_: Request, res: Response) {
  res.render("index", () => {
    res.sendFile(path.resolve(__dirname, "../../../public/signup.html")); // Nombre del archivo HTML
  });
}

export { signupForm, signupAction };