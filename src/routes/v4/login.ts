import express from "express";
import { logOut, getLogin } from "./controllers/loginController";
import passport from "../../passport/passport";
import authenticateUser from "../../middlewares/authenticateUser";

const router = express.Router();

router.post(
  "/login",
  authenticateUser,
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/logout", logOut);

router.get("/login", getLogin);

export default router;
