import express from "express";
const router = express.Router();
import { ClientController } from "../controllers/clients";

// Todo: Implementar middleware de autenticación y autorización
// solo el admin puede crear, actualizar y eliminar clientes

router.post("/clients", (req, res, next) => {
  ClientController.createClient(req, res, next);
});

router.get("/clients/:id", (req, res, next) => {
  ClientController.getClientById(req, res, next);
});

router.get("/clients", (req, res, next) => {
  ClientController.getAllClients(req, res, next);
});

router.delete("/clients/:id", (req, res, next) => {
  ClientController.deleteClient(req, res, next);
});

router.put("/clients/:id", (req, res, next) => {
  ClientController.updateClient(req, res, next);
});

export default router;
