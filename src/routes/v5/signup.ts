import express from "express";
import { signupForm } from "./controllers/signupController";
import passport from "../../passport/passport";

const router = express.Router();

router.post(
  "/",
  passport.authenticate("microsoft", { prompt: "select_account" })
);

router.get("/", signupForm);

export default router;
