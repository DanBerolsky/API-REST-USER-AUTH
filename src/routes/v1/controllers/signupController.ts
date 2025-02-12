import { findByEmail, addUser } from "../../../models/UserModel";
import bcrypt from 'bcrypt';
import { UserSignup } from "../../../types/user";
import { Request, Response } from "express";
import { MESSAGES } from '../../../utils/messages'; // Asegúrate de que la ruta sea correcta
import signupVx from "../../../public/signupVx";

async function signupAction(req: Request, res: Response) {
  const { email, password } = req.body as UserSignup;
  
  try {
    if (!(await findByEmail(email))) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser: UserSignup = { email, password: hashedPassword };
      await addUser(newUser);
      return res.redirect(303, "/v1/login"); // Redirección al login después de un registro exitoso
    } else {
      return res.status(409).json({ error: MESSAGES.AUTH.ERROR.EMAIL_TAKEN }); // Mensaje de error si el email ya está en uso
    }
  } catch (error) {
    console.error("Error during signup: ", error);
    return res.status(500).json({ error: MESSAGES.GENERAL.ERROR.INTERNAL_SERVER_ERROR }); // Mensaje de error interno
  }
}

function signupForm(_: Request, res: Response) {
  res.send(signupVx("/v1/signup"));
}

export { signupForm, signupAction };
