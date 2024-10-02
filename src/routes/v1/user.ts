import express from "express";
const router = express.Router();
import authSession from "../../middlewares/authenticateSession";
import validationErrorHandler from "../../middlewares/validationMiddleware";
import { validationsPassword } from "../../validators/authValidator";
import {
  changePwdAction,
  deleteUserAction,
} from "../global/userController";


router.delete("/", authSession, deleteUserAction);

router.patch(
  "/",
  authSession,
  validationsPassword,
  validationErrorHandler,
  changePwdAction
);

export default router;
