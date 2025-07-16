import express from "express";
const router = express.Router();
import { UserController } from "../controllers/users";
import { ValidateUserMiddleware } from "../middlewares/validateUser";
import { ValidateToken } from "../middlewares/validateToken";
import { ValidateAuthMiddleware } from "../middlewares/validateAuth";
import ValidateAdvisorMiddleware from "../middlewares/validateAdvisor";
import AdvisorsController from "../controllers/advisors";

// este endopoint se usa si no queremos enviar una invitacion de creacion de cuenta para
// crear un usuario nuevo
router.post(
  "/users",
  ValidateToken.validateToken,
  ValidateAuthMiddleware.validateRole(["admin"]),
  ValidateUserMiddleware.checkFieldsWithPass,
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
  ValidateToken.validateToken,
  ValidateAuthMiddleware.validateRole(["admin"]),
  async (req, res, next) => {
    UserController.deleteUser(req, res, next);
  }
);

router.put(
  "/users/:id",
  ValidateToken.validateToken,
  ValidateAuthMiddleware.validateOwnership,
  ValidateUserMiddleware.validateFields(["name", "email", "userId"]),
  (req, res, next) => {
    UserController.updateUser(req, res, next);
  }
);

router.get(
  "/users",
  ValidateToken.validateToken,
  ValidateAuthMiddleware.validateRole(["admin"]),
  async (req, res, next) => {
    UserController.getAllUsers(req, res, next);
  }
);

router.get(
  "/users/:userId/advisors",
  ValidateToken.validateToken,
  ValidateAuthMiddleware.validateRole(["admin", "client", "admin-client"]),
  ValidateUserMiddleware.validateUserId,
  (req, res, next) => {
    UserController.getAdvisorsByUserId(req, res, next);
  }
);

router.delete(
  "/users/:userId/advisors/:advisorId",
  ValidateToken.validateToken,
  ValidateAuthMiddleware.validateRole(["admin", "client", "admin-client"]),
  ValidateUserMiddleware.validateUserId,
  ValidateAdvisorMiddleware.validateAdvisorId,
  ValidateAdvisorMiddleware.validateAdvisorOwnership,
  async (req, res, next) => {
    AdvisorsController.deleteAdvisor(req, res, next);
  }
);

export default router;
