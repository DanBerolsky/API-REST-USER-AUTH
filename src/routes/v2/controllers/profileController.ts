import { Request, Response } from "express";
import jwtRequest from "../../../types/jwtRequest";

export default function getProfile(req: Request, res: Response) {
  let user: jwtRequest = req.user as jwtRequest;
  if (!user || !user.token) {
    res.status(400).send("session errors")
  }
  return res.send(
    `<span>Email: ${user.email}</span></br><span>token: ${user.token}</span></br><a href='/v2/login'>Logout</a>`
  );
}