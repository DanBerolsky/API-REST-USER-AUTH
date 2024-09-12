async function getProfile(req, res) {
  let user = req.user;
  if (user) {
    return res.send(
      `<span>Email: ${user.email}</span></br><span>pass: ${user.password}</span></br><a href='/v1/login'>Logout</a>`
    );
  }
}

module.exports = {
  getProfile,
};
