const path = require("path");
const { findByEmail, addUser } = require("../../../models/UserModel");

async function signupAction(req, res) {
  const postUser = req.body;
  const { email, pwd } = postUser;
  if (!email || !pwd) return res.status(400).send({ error: 'Something failed!' });
  try {
    if (!(await findByEmail(email))) {
      addUser(postUser);
      return res.redirect(303, "/v1/login");
    } else {
      
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(500)
  }
}

function signupForm(_, res) {
  res.render("index", () => {
    res.sendFile(path.resolve(__dirname, "../../../public/signup.html"));
  });
}

module.exports = { signupForm, signupAction };
