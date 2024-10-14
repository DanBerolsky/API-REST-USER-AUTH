import express from "express";
import {getProfile} from "./controllers/profileController";
import ensureAuthenticated from '../../middlewares/authMiddlewere';

const router = express.Router();

router.get("/", ensureAuthenticated, getProfile);

export default router;
