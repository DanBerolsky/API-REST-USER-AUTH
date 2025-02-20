import express from "express";
import { signupForm } from "./controllers/signupController";
import passport from "../../passport/passport";

const router = express.Router();

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/", signupForm);

export default router;
