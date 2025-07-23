import express from "express";
const router = express.Router();
import { AuthController } from "../controllers/auth";
import { ValidateUserMiddleware } from "../middlewares/validateUser";
import { makeLimiter } from "../utils/limiters";
import passport from "passport";
import { ValidateAuthMiddleware } from "../middlewares/validateAuth";
import { ValidateToken } from "../middlewares/validateToken";

router.post("/activate-account", AuthController.activateAccount);

router.post(
  "/login",
  makeLimiter(10, 15),
  ValidateUserMiddleware.checkIsUserExist,
  ValidateUserMiddleware.checkIsActive,
  ValidateUserMiddleware.checkPassword,
  AuthController.login
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/auth/google/callback", (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user, info) => {
    if (err || !user) {
      const message = info?.message || "Error en la autenticación con Google";
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=${encodeURIComponent(message)}`
      );
    }
    req.user = user;
    AuthController.loginWithGoogle(req, res, next);
  })(req, res, next);
});

router.get("/auth/me", ValidateToken.validateToken, (req, res, next) => {
  AuthController.getProfile(req, res, next);
});

router.post("/refresh-token", AuthController.refreshToken);

router.post(
  "/request-reset",
  makeLimiter(3, 15),
  AuthController.requestResetPassword
);
router.post("/reset-password", AuthController.resetPassword);

export default router;
