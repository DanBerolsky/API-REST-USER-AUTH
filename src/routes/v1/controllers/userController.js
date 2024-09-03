const {
  deleteUser,
  updateUserBySessionId,
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
  let user = req.user;
  user.password = req.body.password;
  try {
    console.log(user);
    await updateUserBySessionId(user);
    return res.send();
  } catch (error) {
    return res.sendStatus(500);
  }
}

module.exports = {
  deleteUserAction,
  changePwdAction,
};
