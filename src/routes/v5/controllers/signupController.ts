import { Request, Response } from "express";
import signupVx from "../../../public/signupVx";

function signupForm(_: Request, res: Response) {
  res.send(signupVx("/v5/signup","Microsoft"));
}

export { signupForm };
