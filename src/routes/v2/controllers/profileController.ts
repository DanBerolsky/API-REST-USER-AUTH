import { Request, Response } from "express";
import { UserJWTRequest } from "../../../types/user";

export default function getProfile(req: Request, res: Response) {
  let user: UserJWTRequest = req.user as UserJWTRequest;
  const cadena = JSON.stringify(user);
  return res.send(
    `<span>Email: ${user.email}</span></br><span>token: ${user.token}</span></br><span>profile</span><br><span>${cadena}</span><br><a href='/v2/login'>Logout</a>`
  );
}