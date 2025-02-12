// authMiddleware passport

import { NextFunction, Request, Response } from "express";

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.headers["authorization"]===process.env.ADMIN_SECRET_KEY) {
    console.warn("Usuario Admin, continuando...");
    return next(); // El usuario está autenticado, continúa con la solicitud
  }

  if (req.isAuthenticated()) {
    console.log("Usuario autenticado, continuando...");
    return next(); // El usuario está autenticado, continúa con la solicitud
  }
  res.status(401).json({ message: "Unauthorized" }); // El usuario no está autenticado
}

export default ensureAuthenticated;
