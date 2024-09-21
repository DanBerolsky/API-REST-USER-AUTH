import { Request, Response } from "express";
import User from "../../../types/user";

async function getProfile(req:Request, res:Response) {
  let user = req.user as User;
  if (user) {
    return res.send(
      `<span>Email: ${user.email}</span><a href='/v1/login'>Logout</a>`
    );
  }
}

export {
  getProfile,
};
