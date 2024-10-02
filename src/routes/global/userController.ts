import { deleteUser, changePwd } from "../../models/UserModel";
import bcrypt from "bcrypt";
import { UserAuthenticate, UserEmail } from "../../types/user";
import { Request, Response } from "express";

async function deleteUserAction(req: Request, res: Response) {
  const { email } = req.user as UserEmail;
  try {
    await deleteUser(email);
    res.redirect("/v1/logout");
  } catch (error) {
    res.sendStatus(500);
  }
}

async function changePwdAction(req: Request, res: Response) {
  const { email, password } = req.user as UserAuthenticate;
  const newpassword = req.body.password;
  try {
    // Verifica que la nueva contraseña sea diferente de la actual
    const isNewPasswordSame = await bcrypt.compare(newpassword, password);
    if (isNewPasswordSame) {
      return res.status(400).json({
        message: "New password cannot be the same as the current password",
      });
    }
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    try {
      await changePwd(email, hashedPassword);
      return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Error changing password:", error);
      return res.sendStatus(500);
    }
  } catch (error) {
    console.error("Internal error:", error);
    res.status(500).send("Internal error");
  }
}

export { deleteUserAction, changePwdAction };
