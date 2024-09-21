import express from "express";
import { signupForm, signupAction } from "./controllers/signupController";
import validationErrorHandler from "../../middlewares/validationMiddleware";
import { validations } from "../../validators/authValidator";

const router = express.Router();


router.post("/", validations, validationErrorHandler, signupAction);

router.get("/", signupForm);

export default router;
