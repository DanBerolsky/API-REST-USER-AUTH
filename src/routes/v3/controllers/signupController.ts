import path from "path";
import { findByEmail, addUser } from "../../../models/UserModel";
import bcrypt from 'bcrypt';
import { Request, Response } from "express";

async function signupAction(req:Request, res:Response) {
  
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

function signupForm(_:Request, res:Response) {
  res.render("index", () => {
    res.sendFile(path.resolve(__dirname, "../../../public/signup.html"));
  });
}

export{ signupForm, signupAction };
