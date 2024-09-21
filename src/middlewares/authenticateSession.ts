import { findBySessionId } from "../models/UserModel";
import { Request, Response, NextFunction } from "express";

async function authSession(req: Request, res: Response, next: NextFunction) {
  const sessionId: string | undefined = req.session.sessionId;

  if (!sessionId) {
    return res.status(401).send({ message: "Error session" });
  }
  try {
    const user = await findBySessionId(sessionId);
    if (!user) return res.status(401).send({ message: "Error session" });
    req.user = user;
    return next();
  } catch (err) {
    // Manejar errores en la consulta
    console.error("Error during session authentication:", err);
    return res.status(500).send({ message: "Internal error" });
  }
}
export default authSession;
