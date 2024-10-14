import { Request, Response } from "express";
import User from "../../../types/user";

async function getProfile(req:Request, res:Response) {
  let user = req.user as User;
  if (!user) {
    return res.send(500)
  }
  const cadena = JSON.stringify(user);
  return res.send(
    `<span>profile</span><br><span>${cadena}</span><br><a href='/v3/login'>Logout</a>`
  );
}

export {
  getProfile,
};
