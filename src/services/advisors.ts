import { nanoid } from "nanoid";
import { HttpException } from "./httpException";
import { prisma } from "../prismaClient";

/**
 * model Advisor {
  id     Int    @id @default(autoincrement())
  userId Int
  name   String
  email  String @unique
  slug   String @unique
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
}
 */

class AdvisorsService {
  static async createAdvisor(userId: number, name: string, email: string) {
    try {
      const slug = await this.createSlug();
      const advisor = {
        userId,
        name,
        email,
        slug,
      };

      const advisorCreated = await prisma.advisor.create({
        data: advisor,
      });
      return advisorCreated;
    } catch (error) {
      throw new HttpException(500, "Error al crear el asesor." + error);
    }
  }

  static async getAdvisorById(id: number) {
    try {
      const advisor = await prisma.advisor.findUnique({
        where: { id },
      });
      if (!advisor) {
        throw new HttpException(404, "Asesor no encontrado.");
      }
      return advisor;
    } catch (error) {
      throw new HttpException(500, "Error al obtener el asesor." + error);
    }
  }

  static async updateAdvisor(
    id: number,
    data: Partial<{ name: string; email: string }>
  ) {
    try {
      const advisor = await prisma.advisor.update({
        where: { id },
        data,
      });
      return advisor;
    } catch (error) {
      throw new HttpException(500, "Error al actualizar el asesor." + error);
    }
  }
  static async deleteAdvisor(id: number) {
    try {
      const advisor = await prisma.advisor.delete({
        where: { id },
      });
      return advisor;
    } catch (error) {
      throw new HttpException(500, "Error al eliminar el asesor." + error);
    }
  }

  static async getAdvisors() {
    try {
      const advisors = await prisma.advisor.findMany();
      return advisors;
    } catch (error) {
      throw new HttpException(500, "Error al obtener los asesores." + error);
    }
  }

  static async createSlug() {
    try {
      const slug = nanoid(10);
      return slug;
    } catch (error) {
      throw new HttpException(500, "Error al crear el slug." + error);
    }
  }

  static async getAdvisorBySlug(slug: string) {
    try {
      const advisor = await prisma.advisor.findUnique({
        where: { slug },
      });
      if (!advisor) {
        throw new HttpException(404, "Asesor no encontrado.");
      }
      return advisor;
    } catch (error) {
      throw new HttpException(
        500,
        "Error al obtener el asesor por slug." + error
      );
    }
  }
}

export default AdvisorsService;
