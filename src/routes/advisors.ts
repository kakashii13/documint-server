import express from "express";
const router = express.Router();

import AdvisorsController from "../controllers/advisors";
import { ValidateToken } from "../middlewares/validateToken";
import { ValidateAuthMiddleware } from "../middlewares/validateAuth";
import ValidateAdvisorMiddleware from "../middlewares/validateAdvisor";

router.post(
  "/advisors",
  ValidateToken.validateToken,
  ValidateAuthMiddleware.validateRole(["admin", "client", "admin-client"]),
  ValidateAdvisorMiddleware.validateFields,
  AdvisorsController.createAdvisor
);

export default router;
