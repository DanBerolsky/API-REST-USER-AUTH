const { deleteUser, changePwd } = require("../../../models/UserModel");
const bcrypt = require("bcrypt");

async function deleteUserAction(req, res) {
  const {email} = req.user;
  try {
    await deleteUser(email);
    res.redirect("/v1/logout");
  } catch (error) {
    res.sendStatus(500);
  }
}

async function changePwdAction(req, res) {
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
    return res.redirect('/v1/logout')
  } catch (error) {
    return res.sendStatus(500);
  }
}

module.exports = {
  deleteUserAction,
  changePwdAction,
};
