const { body } = require("express-validator");

// Definir las validaciones
const validationsPassword = body("password")
  .trim()
  .notEmpty()
  .withMessage("Password can't be empty")
  .escape() // Cross-Site Scripting vulnerability (XSS).
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters long") // Longitud mínima
  .matches(/\d/)
  .withMessage("Password must contain at least one number") // Debe contener al menos un número
  .matches(/[a-z]/)
  .withMessage("Password must contain at least one lowercase letter") // Debe contener al menos una letra minúscula
  .matches(/[A-Z]/)
  .withMessage("Password must contain at least one uppercase letter"); // Debe contener al menos una letra mayúscula

const validationsEmail = body("email")
  .trim()
  .notEmpty()
  .withMessage("Email can't be empty")
  .escape() // Cross-Site Scripting vulnerability (XSS).
  .isEmail()
  .withMessage("Invalid email format");

const validations = [validationsEmail, validationsPassword];

export { validations, validationsPassword, validationsEmail };
