const db = require("../database/db.json");
const path = require("path");
const { findByEmail, addUser } = require("../models/UserModel");

async function signupAction(req, res) {
  const postUser = req.body;
  const { email, pwd } = postUser;
  const users = db["users"];
  if (!email || !pwd) return res.status(400).send({ error: 'Something failed!' });
  if (!findByEmail(users, email)) {
    
    addUser(postUser);
    return res.redirect(303, "/v1/login");
  } else {
    res.sendStatus(401);
  }
}

function signupForm(_, res) {
  res.render("index", () => {
    res.sendFile(path.resolve(__dirname, "../public/signup.html"));
  });
}

module.exports = { signupForm, signupAction };
