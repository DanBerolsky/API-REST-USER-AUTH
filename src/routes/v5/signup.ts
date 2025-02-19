import express from "express";
import { signupForm } from "./controllers/signupController";
import passport from "../../passport/passport";
import verifyCaptcha from "../../middlewares/global/recaptcha/verifyCaptcha";

const router = express.Router();

router.post(
  "/",
  verifyCaptcha,
  passport.authenticate("microsoft", { prompt: "select_account" })
);

router.get("/", signupForm);

export default router;
