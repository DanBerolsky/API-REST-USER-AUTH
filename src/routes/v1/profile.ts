import express from "express";
import {getProfile} from "./controllers/profileController";
import authSession  from "../../middlewares/authenticateSession";

const router = express.Router();

router.get("/", authSession, getProfile);

export default router;