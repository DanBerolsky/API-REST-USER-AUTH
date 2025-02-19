import express from "express";
import { login, logOut, getLogin } from "./controllers/loginController";
import validationErrorHandler from "../../middlewares/validationMiddleware";
import { validations } from "../../validators/authValidator";
import authenticateUser from "../../middlewares/authenticateUser";
import verifyCaptcha from "../../middlewares/global/recaptcha/verifyCaptcha";
const router = express.Router();

router.post(
  "/login",
  validations,
  validationErrorHandler,
  verifyCaptcha,
  authenticateUser,
  login
);

router.get("/logout", logOut);

router.get("/login", getLogin);

export default router;
