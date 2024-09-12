const path = require("path");
const { findByEmail, addUser } = require("../../../models/UserModel");
const bcrypt = require('bcrypt');

async function signupAction(req, res) {
  
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).send({ error: 'Something failed!' });
  try {
    if (!(await findByEmail(email))) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = { email, password: hashedPassword };
      await addUser(newUser);
      return res.redirect(303, "/v1/login");
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(500)
  }
}

function signupForm(_, res) {
  res.render("index", () => {
    res.sendFile(path.resolve(__dirname, "../../../public/signupV2.html"));
  });
}

module.exports = { signupForm, signupAction };
