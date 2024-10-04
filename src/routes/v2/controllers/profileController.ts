import { Request, Response } from "express";
import { UserJWTRequest } from "../../../types/user";

export default function getProfile(req: Request, res: Response) {
  let user: UserJWTRequest = req.user as UserJWTRequest;
  
  return res.send(
    `<span>Email: ${user.email}</span></br><span>token: ${user.token}</span></br><a href='/v2/login'>Logout</a>`
  );
}