import { Router } from "express";
import login from "./routes/v1/login";
import signup from "./routes/v1/signup";
import profile from "./routes/v1/profile";
import user from "./routes/v1/user";
import loginV2 from "./routes/v2/login";
import signupV2 from "./routes/v2/signup";
import profileV2 from "./routes/v2/profile";
import userV2 from "./routes/v2/user";
import loginV3 from "./routes/v3/login";
import signupV3 from "./routes/v3/signup";
import profileV3 from "./routes/v3/profile";
import userV3 from "./routes/v3/user";
import loginV4 from "./routes/v4/login";
import signupV4 from "./routes/v4/signup";
import profileV4 from "./routes/v4/profile";
import userV4 from "./routes/v4/user";
import googleCallbackV4 from "./routes/v4/googleCallback";
import loginV5 from "./routes/v5/login";
import signupV5 from "./routes/v5/signup";
import profileV5 from "./routes/v5/profile";
import userV5 from "./routes/v5/user";
import microsoftCallbackV5 from "./routes/v5/microsoftCallback";
import confirmUser from "./routes/global/confirmUser";
import forgotPasswordMailer from "./routes/global/forgotPasswordMailer";
import adminGetData from "./routes/global/admin";
import verifyCaptcha from "./middlewares/global/recaptcha/verifyCaptcha";

const router = Router();

router.use("/confirm", confirmUser);
router.use("/", verifyCaptcha, forgotPasswordMailer);

router.use("/v1/", verifyCaptcha, login);
router.use("/v1/signup", verifyCaptcha, signup);
router.use("/v1/profile", profile);
router.use("/v1/user", user);

router.use("/v2/", verifyCaptcha, loginV2);
router.use("/v2/signup", verifyCaptcha, signupV2);
router.use("/v2/profile", profileV2);
router.use("/v2/user", userV2);

router.use("/v3/", verifyCaptcha, loginV3);
router.use("/v3/signup", verifyCaptcha, signupV3);
router.use("/v3/profile", profileV3);
router.use("/v3/user", userV3);

router.use("/v4/", verifyCaptcha, loginV4);
router.use("/v4/signup", verifyCaptcha, signupV4);
router.use("/v4/profile", profileV4);
router.use("/v4/user", userV4);
router.use("/v4/auth/google/callback", googleCallbackV4);

router.use("/v5/", verifyCaptcha, loginV5);
router.use("/v5/signup", verifyCaptcha, signupV5);
router.use("/v5/profile", profileV5);
router.use("/v5/user", userV5);
router.use("/v5/microsoft/callback", microsoftCallbackV5);

router.use("/admin/viewdata", adminGetData);

export default router;
