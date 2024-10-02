import { Request, Response } from "express";
import { UserSession } from "../../../types/user";

async function getProfile(req: Request, res: Response) {
  const user = req.user as UserSession;
  if (user) {
    return res.send(
      `<span>Email: ${user.email}</span></br></br><span>id: ${user.sessionId}</span></br><a href='/v1/login'>Logout</a>`
    );
  }
}

export { getProfile };
