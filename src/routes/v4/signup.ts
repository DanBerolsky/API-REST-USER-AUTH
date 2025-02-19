import express from "express";
import { signupForm } from "./controllers/signupController";
import passport from "../../passport/passport";
import verifyCaptcha from "../../middlewares/global/recaptcha/verifyCaptcha";

const router = express.Router();
console.log(process.env.CORS_ORIGIN);

router.get(
  "/",
  verifyCaptcha,
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/", signupForm);

export default router;
