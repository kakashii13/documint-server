import { prisma } from "../prismaClient";

class ClientService {
  static async createClient(client: any) {
    try {
      const newClient = await prisma.client.create({
        data: client,
      });
      return newClient;
    } catch (error) {
      console.error("Error creating client:", error);
      throw new Error("Failed to create client");
    }
  }

  static async getClientById(id: number) {
    try {
      const client = await prisma.client.findUnique({
        where: { id },
      });
      return client;
    } catch (error) {
      console.error("Error fetching client by ID:", error);
      throw new Error("Failed to fetch client");
    }
  }

  static async deleteClient(id: string) {
    try {
      const deletedClient = await prisma.client.delete({
        where: { id: Number(id) },
      });
      return deletedClient;
    } catch (error) {
      console.error("Error deleting client:", error);
      throw new Error("Failed to delete client");
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
      console.error("Error updating client:", error);
      throw new Error("Failed to update client");
    }
  }

  static async getAllClients() {
    try {
      const clients = await prisma.client.findMany();
      return clients;
    } catch (error) {
      console.error("Error fetching all clients:", error);
      throw new Error("Failed to fetch clients");
    }
  }
}

export { ClientService };
