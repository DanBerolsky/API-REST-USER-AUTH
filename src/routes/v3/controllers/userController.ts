import { deleteUser, changePwd } from "../../../models/UserModel";
import bcrypt from 'bcrypt';


async function deleteUserAction(req:any, res:any) {
  const {email} = req.user;
  try {
    await deleteUser(email);
    res.redirect("/v3/logout");
    //res.send("borrado");
  } catch (error) {
    res.sendStatus(500);
  }
}

async function changePwdAction(req:any, res:any) {
  const { email, password } = req.user;
  const newpassword = req.body.password;
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
    res.redirect("/v3/logout");
    //return res.send("ok");
  } catch (error) {
    return res.sendStatus(500);
  }
}

export {
  deleteUserAction,
  changePwdAction,
};
