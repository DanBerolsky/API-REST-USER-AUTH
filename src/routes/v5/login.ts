import express from "express";
import { logOut, getLogin } from "./controllers/loginController";
import passport from "../../passport/passport";

const router = express.Router();

router.post(
  "/login",
  passport.authenticate("microsoft", { prompt: "select_account" })
);

router.get("/logout", logOut);

router.get("/login", getLogin);

export default router;
