import express from "express";
const router = express.Router();
import { ClientController } from "../controllers/clients";
import { ValidateClientMiddleware } from "../middlewares/validateClient";
import { ValidateToken } from "../middlewares/validateToken";
import { ValidateAuthMiddleware } from "../middlewares/validateAuth";

router.post(
  "/clients",
  ValidateToken.validateToken,
  ValidateAuthMiddleware.validateRole(["admin"]),
  ValidateClientMiddleware.validateFields,
  ClientController.createClient
);

router.get(
  "/clients/:id",
  ValidateToken.validateToken,
  ValidateAuthMiddleware.validateRole(["admin"]),
  (req, res, next) => {
    ClientController.getClientById(req, res, next);
  }
);

router.get(
  "/clients/:clientId/users",
  ValidateToken.validateToken,
  ValidateAuthMiddleware.validateRole(["admin", "admin-client"]),
  ValidateClientMiddleware.validateClientId,
  (req, res, next) => {
    ClientController.getUsersByClientId(req, res, next);
  }
);

router.get(
  "/clients",
  ValidateToken.validateToken,
  ValidateAuthMiddleware.validateRole(["admin"]),
  ClientController.getAllClients
);

router.delete(
  "/clients/:id",
  ValidateToken.validateToken,
  ValidateAuthMiddleware.validateRole(["admin"]),
  (req, res, next) => {
    ClientController.deleteClient(req, res, next);
  }
);

router.delete(
  "/clients/:clientId/users/:userId",
  ValidateToken.validateToken,
  ValidateAuthMiddleware.validateRole(["admin", "admin-client"]),
  (req, res, next) => {
    ClientController.deleteUserFromClient(req, res, next);
  }
);

router.put(
  "/clients/:id",
  ValidateToken.validateToken,
  ValidateAuthMiddleware.validateRole(["admin"]),
  (req, res, next) => {
    ClientController.updateClient(req, res, next);
  }
);

export default router;
