import { Request, Response } from "express";
import { deleteUser, changePwd, findByEmail } from "../../../models/UserModel";
import bcrypt from "bcrypt";
import User from "../../../types/user";

async function deleteUserAction(req: Request, res:Response) {
  const {email} = req.user as User;
  if (!email) {
    return res.send(500)
  }
  try {
    await deleteUser(email);
    res.redirect("/v2/logout");
  } catch (error) {
    res.sendStatus(500);
  }
}

async function changePwdAction(req: Request, res:Response) {
  const { email } = req.user as User;
  const newpassword = req.body.password;
  if (!email) {
    return res.send(500)
  }
  try {
    const { password } = await findByEmail(email) as User;
    if (!password) {
      return res.send(500)
    }
    
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
      return res.send("ok");
    } catch (error) {
      return res.sendStatus(500);
    }
  } catch (error) {
    res.status(500).send("Internal error");
  }
}

export {
  deleteUserAction,
  changePwdAction,
};
