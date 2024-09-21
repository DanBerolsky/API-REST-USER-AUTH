const { validationResult } = require("express-validator");

// Middleware para manejar errores de validación
function validationErrorHandler(req: any, res: any, next: any) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
}

export default validationErrorHandler;
