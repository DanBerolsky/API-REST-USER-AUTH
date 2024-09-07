const {
  deleteUser,
  changePwd,
} = require("../../../models/UserModel");

async function deleteUserAction(req, res) {
    const user = req.user
    try {
    await deleteUser(user);
    res.send("borrado");
  } catch (error) {
    res.sendStatus(500);
  }
}

async function changePwdAction(req, res) {
  const email = req.user.email;
  const password = req.body.password;
  try {
    await changePwd(email, password);
    return res.send();
  } catch (error) {
    return res.sendStatus(500);
  }
}

module.exports = {
  deleteUserAction,
  changePwdAction,
};
