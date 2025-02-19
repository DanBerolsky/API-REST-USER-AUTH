import express from "express";
import { signupForm, signupAction } from "./controllers/signupController";
import validationErrorHandler from "../../middlewares/validationMiddleware";
import { validations } from "../../validators/authValidator";
import verifyCaptcha from "../../middlewares/global/recaptcha/verifyCaptcha";

const router = express.Router();

router.post(
  "/",
  validations,
  validationErrorHandler,
  verifyCaptcha,
  signupAction
);

router.get("/", signupForm);

export default router;
