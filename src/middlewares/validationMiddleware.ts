import { NextFunction, Request, Response } from "express";

const { validationResult } = require("express-validator");

// Middleware para manejar errores de validación
function validationErrorHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = extractErrors(errors);
    return res.status(400).json(extractedErrors);
  }
  return next();
}

function extractErrors(response: any) {
  return response.errors.map(
    ({ path, msg }: { path: string; msg: string }) => ({
      field: path, // Renombramos "path" a "field"
      error: msg, // Renombramos "msg" a "error"
    })
  );
}

export default validationErrorHandler;
