import { Router } from "express";
import passport from "../../passport/passport";

const router = Router();

router.get(
  "/",
  passport.authenticate("google", { failureRedirect: "/v4/signup" }),
  (req, res) => {
    return res.redirect("/v4/profile");
  }
);

export default router;
