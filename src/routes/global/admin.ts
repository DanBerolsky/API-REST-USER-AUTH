import { Router } from "express";
import { getDataBase } from "./controllers/adminController";

const router = Router();

router.get("/", getDataBase);

export default router;
