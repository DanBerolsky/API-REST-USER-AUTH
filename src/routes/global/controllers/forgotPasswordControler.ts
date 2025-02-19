import { sendEmail } from "../../../helpers/mailerHelper";
import JWTHelper from "../../../helpers/JWTHelper";
import forgotPwdEmail from "../../../public/forgotPassword";
import bcrypt from "bcrypt";
import { changePwd, findByEmail } from "../../../models/UserModel";
import { UserEmail } from "../../../types/user";
import { Request, Response } from "express";
import PasswordResetSuccess from "../../../public/passwordResetSuccess";

export async function forgotPasswordController(req: Request, res: Response) {
  const { email } = req.body;

  //existe el usuario?
  try {
    const user = await findByEmail(email);
    //sino existe no envia correo
    if (!user) {
      return res.send(200);
    }
  } catch (error) {
    return res.send(500);
  }

  const token = new JWTHelper(process.env.JWT_SECRET_KEY).sign(
    { email },
    { expiresIn: "30m" }
  );
  const resetPwdUrl = `${process.env.BASE_URL}/reset-password/:token=${token}`;
  try {
    sendEmail(email, "forgot-password", ``, forgotPwdEmail(resetPwdUrl));
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function resetPasswordController(req: Request, res: Response) {
  const token = req.params.token.split("=")[1];
  const { newPassword } = req.body;

  // Validar el token y restablecer la contraseña
  new JWTHelper(process.env.JWT_SECRET_KEY).verify(
    token,
    async (err, decoded) => {
      if (err) {
        return res.sendStatus(403).send({ message: "token inválido" }); // Token inválido
      }
      if (!decoded) {
        return res.sendStatus(403).send({ message: "token inválido" }); // Token inválido
      }
      const { email } = decoded as UserEmail;
      try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await changePwd(email, hashedPassword);
        const frontUrl = process.env.SUCCESS_REDIRECT_URL;
        return res.send(PasswordResetSuccess(frontUrl));
      } catch (error) {
        return res.sendStatus(500);
      }
    }
  );
}
