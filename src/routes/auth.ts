import express from "express";
const router = express.Router();
import { AuthController } from "../controllers/auth";

router.post("/activate-account", AuthController.activateAccount);
router.post("/login", AuthController.login);

export default router;
