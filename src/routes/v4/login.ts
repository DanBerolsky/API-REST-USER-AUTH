import express from "express";
import { logOut } from "./controllers/loginController";
import passport from "../../passport/passport";

const router = express.Router();

router.get(
  "/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/logout", logOut);

/* router.get("/login", getLogin);
 */
export default router;
