import { prisma } from "../prismaClient";
import { HttpException } from "./httpException";

class RoleService {
  static async getRoles(role: string) {
    try {
      // Si el rol es 'admin', devuelve todos los roles
      if (role.toLowerCase() === "admin") {
        const roles = await prisma.role.findMany({
          orderBy: {
            role: "asc",
          },
        });
        return roles;
      }

      if (role.toLowerCase() === "admin-client") {
        // Si el rol es 'admin-client', devuelve todos los roles excepto 'admin'
        const roles = await prisma.role.findMany({
          where: {
            role: {
              not: "admin",
            },
          },
          orderBy: {
            role: "asc",
          },
        });
        return roles;
      }
    } catch (error) {
      throw new HttpException(500, "Error al obtener los roles");
    }
  }
}

export default RoleService;
