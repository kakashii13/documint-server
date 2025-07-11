import { Router } from "express";
const router = Router();
import RoleController from "../controllers/roles";
import { ValidateAuthMiddleware } from "../middlewares/validateAuth";
import { ValidateToken } from "../middlewares/validateToken";

router.get("/roles", ValidateToken.validateToken, RoleController.getRoles);

export default router;
