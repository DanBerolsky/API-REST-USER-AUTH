import express from "express";
import {
  forgotPasswordController,
  resetPasswordController,
} from "./controllers/forgotPasswordControler";
import validationErrorHandler from "../../middlewares/validationMiddleware";
import { validationsEmail } from "../../validators/authValidator";
const router = express.Router();

router.post(
  "/forgot-password",
  validationsEmail,
  validationErrorHandler,
  forgotPasswordController
);

router.post("/reset-password/:token", resetPasswordController);

export default router;
