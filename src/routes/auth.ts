import express from "express";
const router = express.Router();
import { AuthController } from "../controllers/auth";
import { CheckUserMiddleware } from "../middlewares/checkUser";

router.post("/activate-account", AuthController.activateAccount);
router.post(
  "/login",
  CheckUserMiddleware.checkIsUserExist,
  CheckUserMiddleware.checkIsActive,
  CheckUserMiddleware.checkPassword,
  AuthController.login
);

export default router;
