import { Request, Response, NextFunction } from "express";
import { ClientService } from "../services/clients";

/** 
 * model Client {
  id     Int      @id @default(autoincrement())
  name   String 
  email  String
  active Boolean  @default(true)

  users  User[]
}
 */

class ClientController {
  static async createClient(req: Request, res: Response, next: NextFunction) {
    try {
      const { client } = req.body;

      const newClient = await ClientService.createClient(client);

      res.status(201).send({
        message: "Cliente creado satisfactoriamente.",
        client: newClient,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getClientById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      console.log(id);

      if (!id) {
        return res
          .status(400)
          .send({ message: "ID del cliente es requerido." });
      }

      const client: any = await ClientService.getClientById(Number(id));

      if (!client) {
        return res.status(404).send({ message: "Cliente no encontrado." });
      }

      res.status(200).send({ client });
    } catch (error) {
      next(error);
    }
  }

  static async deleteClient(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(400)
          .send({ message: "ID del cliente es requerido." });
      }

      const deletedClient = await ClientService.deleteClient(id);

      res.status(200).send({
        message: "Cliente eliminado satisfactoriamente.",
        client: deletedClient,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateClient(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { client } = req.body;

      if (!id || !client) {
        return res.status(400).send({
          message: "ID del cliente y datos a actualizar son requeridos.",
        });
      }

      const updatedClient = await ClientService.updateClient(id, client);

      res.status(200).send({
        message: "Cliente actualizado satisfactoriamente.",
        client: updatedClient,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllClients(req: Request, res: Response, next: NextFunction) {
    try {
      const clients = await ClientService.getAllClients();

      res.status(200).send({ clients });
    } catch (error) {
      next(error);
    }
  }
}

export { ClientController };
