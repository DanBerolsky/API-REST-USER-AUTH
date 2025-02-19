import { Router } from "express";
import passport from "../../passport/passport";

const router = Router();

router.get(
  "/",
  passport.authenticate("google", {
    successRedirect: process.env.SUCCESS_REDIRECT_URL,
    failureRedirect: process.env.FAILURE_REDIRECT_URL,
  })
  /*, (req, res) => {
    //return res.redirect("/v4/profile");
    return res.json({ ...req.user });
  } */
);

export default router;
