import { prisma } from "../prismaClient";
import { User } from "../types/types";
import { hashValue } from "../utils/hashValue";
import sanitizeUser from "../utils/sanitizeUser";
import { HttpException } from "./httpException";

class ClientService {
  static async createClient(client: any) {
    try {
      client.email = client.email.toLowerCase();
      const newClient = await prisma.client.create({
        data: client,
      });
      return newClient;
    } catch (error) {
      throw new HttpException(500, "Error al crear el cliente." + error);
    }
  }

  static async getClientById(id: number) {
    try {
      const client = await prisma.client.findUnique({
        where: { id },
      });
      return client;
    } catch (error) {
      throw new HttpException(500, "Error al obtener el cliente." + error);
    }
  }

  static async deleteClient(id: string) {
    try {
      const deletedClient = await prisma.client.delete({
        where: { id: Number(id) },
      });
      return deletedClient;
    } catch (error) {
      throw new HttpException(500, "Error al eliminar el cliente." + error);
    }
  }

  static async updateClient(id: string, client: any) {
    try {
      const updatedClient = await prisma.client.update({
        where: { id: Number(id) },
        data: client,
      });
      return updatedClient;
    } catch (error) {
      throw new HttpException(500, "Error al actualizar el cliente." + error);
    }
  }

  static async getAllClients() {
    try {
      const clients = await prisma.client.findMany();
      return clients;
    } catch (error) {
      throw new HttpException(500, "Error al obtener los clientes." + error);
    }
  }

  static async getUsersByClientId(clientId: string) {
    try {
      const users = await prisma.user.findMany({
        where: { clientId: Number(clientId) },
      });
      return users.map(sanitizeUser);
    } catch (error) {
      throw new HttpException(
        500,
        "Error al obtener los usuarios del cliente." + error
      );
    }
  }
}

export { ClientService };
