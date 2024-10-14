import express from "express";
import { changePwdAction, deleteUserAction } from "../global/userController";
import ensureAuthenticated from "../../middlewares/authMiddlewere";

const router = express.Router();

router.delete("/", ensureAuthenticated, deleteUserAction);

router.patch("/", ensureAuthenticated, changePwdAction);

export default router;
