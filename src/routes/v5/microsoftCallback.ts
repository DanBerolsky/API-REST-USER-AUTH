import { Router } from "express";
import passport from "../../passport/passport";

const router = Router();

router.get(
  "/",
  passport.authenticate("microsoft", { failureRedirect: "/v5/signup" }),
  (req, res) => {
    return res.redirect("/v5/profile");
  }
);

export default router;
