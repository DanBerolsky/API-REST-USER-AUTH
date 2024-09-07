function getProfile(req, res) {
  const user = req.user;
  return res.send(
    `<span>Email: ${user.email}</span></br><span>pass: ${user.password}</span> </br><span>token: ${user.token}</span></br><a href='/v2/login'>Logout</a>`
  );
}

module.exports = {
  getProfile,
};
