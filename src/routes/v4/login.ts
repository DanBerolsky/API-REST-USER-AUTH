import express from "express";
import { logOut } from "./controllers/loginController";
import passport from "../../passport/passport";
import authenticateUser from "../../middlewares/authenticateUser";
import verifyCaptcha from "../../middlewares/global/recaptcha/verifyCaptcha";

const router = express.Router();

router.get(
  "/login",
  verifyCaptcha,
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/logout", logOut);

/* router.get("/login", getLogin);
 */
export default router;
