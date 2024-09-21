import express from "express";
import {login, getLogin, logOut} from "./controllers/loginController";
import validationErrorHandler from "../../middlewares/validationMiddleware";
import { validations } from "../../validators/authValidator";
import authenticateUser from "../../middlewares/authenticateUser";

const router = express.Router();

router.post("/login", validations, validationErrorHandler, authenticateUser, login);

router.get("/logout", logOut)

router.get("/login", getLogin);

export default router;
