import express from "express";
const router = express.Router();
import { UserController } from "../controllers/users";
import { ValidateUserMiddleware } from "../middlewares/validateUser";
import { ValidateToken } from "../middlewares/validateToken";
import { ValidateAuthMiddleware } from "../middlewares/validateAuth";

// Todo: Implementar modificacion de usuario ruta

router.post(
  "/users",
  ValidateToken.validateToken,
  ValidateAuthMiddleware.validateUserWithToken,
  ValidateAuthMiddleware.isAdmin,
  ValidateUserMiddleware.checkFields,
  UserController.createUser
);

router.get(
  "/users/:id",
  ValidateToken.validateToken,
  ValidateAuthMiddleware.validateOwnership,
  async (req, res, next) => {
    UserController.getUserById(req, res, next);
  }
);

router.delete(
  "/users/:id",
  ValidateAuthMiddleware.validateOwnership,
  ValidateToken.validateToken,
  ValidateAuthMiddleware.validateUserWithToken,
  ValidateAuthMiddleware.isAdmin,
  async (req, res, next) => {
    UserController.deleteUser(req, res, next);
  }
);

// router.put("/users/:id", async (req, res, next) => {
//   UserController.updateUser(req, res, next);
// });

router.get(
  "/users",
  ValidateToken.validateToken,
  ValidateAuthMiddleware.validateUserWithToken,
  ValidateAuthMiddleware.isAdmin,
  async (req, res, next) => {
    UserController.getAllUsers(req, res, next);
  }
);

export default router;
