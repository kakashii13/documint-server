import express from "express";
const router = express.Router();
import { AuthController } from "../controllers/auth";
import { ValidateUserMiddleware } from "../middlewares/validateUser";

router.post("/activate-account", AuthController.activateAccount);
router.post(
  "/login",
  ValidateUserMiddleware.checkIsUserExist,
  ValidateUserMiddleware.checkIsActive,
  ValidateUserMiddleware.checkPassword,
  AuthController.login
);

export default router;
