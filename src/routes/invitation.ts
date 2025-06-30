import express from "express";
const router = express.Router();
import { InvitationController } from "../controllers/invitation";

// Todo: el unico que puede crear invitaciones es el admin

router.post("/invitations", InvitationController.createInvitation);

export default router;
