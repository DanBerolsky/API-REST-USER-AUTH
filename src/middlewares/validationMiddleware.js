const { validationResult } = require("express-validator");

// Middleware para manejar errores de validación
function validationErrorHandler(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = validationErrorHandler;