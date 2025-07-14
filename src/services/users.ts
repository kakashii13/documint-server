import { Prisma } from "@prisma/client";
import { prisma } from "../prismaClient";
import { User } from "../types/types";
import { generateLink } from "../utils/generateLink";
import { hashValue } from "../utils/hashValue";
import { HttpException } from "./httpException";

class UserService {
  static async createUser(user: User) {
    try {
      const hash_password = await hashValue(user.password || "");
      user.hash_password = hash_password;
      const newUser = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          hash_password: user.hash_password,
          role: user.role || "client",
          clientId: user.clientId,
          active: false,
        },
      });
      return newUser;
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new HttpException(400, "El email ya está registrado.");
        }
      }
      throw new HttpException(500, "Error al crear el usuario: " + error);
    }
  }

  static async getUserById(id: number) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      return user;
    } catch (error) {
      throw new HttpException(500, "Error al obtener el usuario: " + error);
    }
  }

  static async getUserByEmail(email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      return user;
    } catch (error) {
      throw new HttpException(
        500,
        "Error al obtener el usuario por email: " + error
      );
    }
  }

  static async deleteUser(id: number) {
    try {
      const user = await prisma.user.delete({
        where: { id },
      });
      return user;
    } catch (error) {
      throw new HttpException(500, "Error al eliminar el usuario: " + error);
    }
  }

  static async updateUser(user: { userId: number; hash_password: string }) {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: user.userId },
        data: {
          hash_password: user.hash_password,
          active: true,
        },
      });
      return updatedUser;
    } catch (error) {
      throw new HttpException(500, "Error al actualizar el usuario: " + error);
    }
  }

  static async getAllUsers() {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      throw new HttpException(500, "Error al obtener los usuarios: " + error);
    }
  }
  static async getAdvisorsByUserId(userId: number) {
    try {
      const advisors = await prisma.advisor.findMany({
        where: { userId },
      });

      advisors.map((a) => {
        a.slug = generateLink(a.slug);
      });
      return advisors;
    } catch (error) {
      throw new HttpException(
        500,
        "Error al obtener los asesores por ID de usuario: " + error
      );
    }
  }
}

export { UserService };
