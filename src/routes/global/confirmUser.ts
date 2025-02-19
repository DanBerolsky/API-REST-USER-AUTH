import { Router } from "express";
import JWTHelper from "../../helpers/JWTHelper";
import { confirmUser } from "../../models/UserModel";
import AccountConfirmationSuccess from "../../public/AccountConfirmationSuccess";

const router = Router();

//patch
router.get("/:token", (req, res) => {
  const userToken = req.params.token.split("=")[1];
  const { email } = new JWTHelper().decode(userToken) as { email: string };
  if (!email) {
    return res.sendStatus(402);
  }

  confirmUser(email);

  const frontUrl = process.env.SUCCESS_REDIRECT_URL;
  return res.send(AccountConfirmationSuccess(frontUrl));
});

export default router;
