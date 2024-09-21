const express = require("express");
const router = express.Router();
import { changePwdAction, deleteUserAction } from "./controllers/userController";
import authenticateToken from "../../middlewares/authenticateToken";
import validationErrorHandler from "../../middlewares/validationMiddleware";
import { validationsPassword } from "../../validators/authValidator";

router.delete("/", authenticateToken, deleteUserAction);

router.patch(
  "/",
  authenticateToken,
  validationsPassword,
  validationErrorHandler,
  changePwdAction
);


export default router;
