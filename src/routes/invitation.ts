import express from "express";
const router = express.Router();
import { InvitationController } from "../controllers/invitation";
import { ValidateUserMiddleware } from "../middlewares/validateUser";
import { ValidateToken } from "../middlewares/validateToken";
import { ValidateAuthMiddleware } from "../middlewares/validateAuth";

// crear usuario a traves de una invitacion
router.post(
  "/invitations",
  ValidateToken.validateToken,
  ValidateAuthMiddleware.validateRole(["admin", "admin-client"]),
  ValidateUserMiddleware.checkFields,
  InvitationController.createInvitation
);

export default router;
