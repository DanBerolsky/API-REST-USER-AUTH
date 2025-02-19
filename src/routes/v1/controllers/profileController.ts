import { Request, Response } from "express";
import User, { UserSession } from "../../../types/user";

async function getProfile(req: Request, res: Response) {
  const user = req.user as User;
  
  if (user) {
    const userSession = {email:user.email,sessionId:user.sessionId} as UserSession
    const cadena = JSON.stringify(userSession);
    return res.send(
      `<span>Email: ${user.email}</span></br></br><span>id: ${user.sessionId}</span></br></br><span>profile</span><br><a href='/v1/login'>Logout</a>`
    );
  }
}

export { getProfile };
