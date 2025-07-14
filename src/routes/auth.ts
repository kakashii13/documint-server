import express from "express";
const router = express.Router();
import { AuthController } from "../controllers/auth";
import { ValidateUserMiddleware } from "../middlewares/validateUser";
import rateLimit from "express-rate-limit";
import { makeLimiter } from "../utils/limiters";

router.post("/activate-account", AuthController.activateAccount);

router.post(
  "/login",
  makeLimiter(10, 15),
  ValidateUserMiddleware.checkIsUserExist,
  ValidateUserMiddleware.checkIsActive,
  ValidateUserMiddleware.checkPassword,
  AuthController.login
);

router.post(
  "/request-reset",
  makeLimiter(3, 15),
  AuthController.requestResetPassword
);
router.post("/reset-password", AuthController.resetPassword);

export default router;
