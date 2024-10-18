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
import confirmUser from "./routes/global/confirmUser"
import forgotPasswordMailer from "./routes/global/forgotPasswordMailer"

const router = Router();

router.use("/confirm", confirmUser)
router.use("/", forgotPasswordMailer)

router.use("/v1/", login);
router.use("/v1/signup", signup);
router.use("/v1/profile", profile);
router.use("/v1/user", user);

router.use("/v2/", loginV2);
router.use("/v2/signup", signupV2);
router.use("/v2/profile", profileV2);
router.use("/v2/user", userV2);

router.use("/v3/", loginV3);
router.use("/v3/signup", signupV3);
router.use("/v3/profile", profileV3);
router.use("/v3/user", userV3);

router.use("/v4/", loginV4);
router.use("/v4/signup", signupV4);
router.use("/v4/profile", profileV4);
router.use("/v4/user", userV4);
router.use("/v4/auth/google/callback", googleCallbackV4);

export default router;
