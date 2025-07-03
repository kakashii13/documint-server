import express from "express";
const router = express.Router();
import { InvitationController } from "../controllers/invitation";
import { ValidateUserMiddleware } from "../middlewares/validateUser";

// Todo: el unico que puede crear invitaciones es el admin

router.post(
  "/invitations",
  ValidateUserMiddleware.checkFields,
  InvitationController.createInvitation
);

export default router;
