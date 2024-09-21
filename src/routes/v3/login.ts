import express from "express";
import { login, logOut, getLogin } from "./controllers/loginController";
import validationErrorHandler from "../../middlewares/validationMiddleware";
import { validations } from "../../validators/authValidator";

const router = express.Router();

router.post("/login", validations, validationErrorHandler, login);

router.get("/logout", logOut);

router.get("/login", getLogin);

export default router;
