import express from "express";
const router = express.Router();
import { UserController } from "../controllers/users";

// Todo: Implementar middleware de autenticación y autorización
// solo el admin puede crear, actualizar y eliminar usuarios
// y los usuarios pueden obtener su propio perfil

router.post("/users", async (req, res, next) => {
  UserController.createUser(req, res, next);
});

router.get("/users/:id", async (req, res, next) => {
  UserController.getUserById(req, res, next);
});

router.delete("/users/:id", async (req, res, next) => {
  UserController.deleteUser(req, res, next);
});

router.put("/users/:id", async (req, res, next) => {
  UserController.updateUser(req, res, next);
});

router.get("/users", async (req, res, next) => {
  UserController.getAllUsers(req, res, next);
});

export default router;
