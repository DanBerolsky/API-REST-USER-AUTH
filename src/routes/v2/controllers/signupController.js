const path = require("path");
const { findByEmail, addUser } = require("../../../models/UserModel");

async function signupAction(req, res) {
  const postUser = req.body;
  const { email, password } = postUser;
  if (!email || !password) return res.status(400).send({ error: 'Something failed!' });
  try {
    const user = await findByEmail(email)
    if (!user) {
      try{
        await addUser(postUser);
        return res.redirect(303, "/v2/login");
      }catch(err){
        return res.sendStatus(500)
      }
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    return res.sendStatus(400)
  }
}

function signupForm(_, res) {
  res.render("index", () => {
    res.sendFile(path.resolve(__dirname, "../../../public/signupV2.html"));
  });
}

module.exports = { signupForm, signupAction };
