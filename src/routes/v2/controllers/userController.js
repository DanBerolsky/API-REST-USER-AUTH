const {
  deleteUser,
  changePwd,
  findByEmail,
} = require("../../../models/UserModel");
const bcrypt = require("bcrypt");

async function deleteUserAction(req, res) {
  const {email} = req.user;
  try {
    await deleteUser(email);
    res.redirect("/v2/logout");
  } catch (error) {
    res.sendStatus(500);
  }
}

async function changePwdAction(req, res) {
  const { email } = req.user;
  const newpassword = req.body.password;
  try {
    const { password } = await findByEmail(email);
    console.log(password);

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

module.exports = {
  deleteUserAction,
  changePwdAction,
};
