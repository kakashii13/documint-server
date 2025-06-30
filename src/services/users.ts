import { prisma } from "../prismaClient";
import { HttpException } from "./httpException";

class UserService {
  static async createUser(user: any) {
    try {
      const newUser = await prisma.user.create({
        data: user,
      });
      return newUser;
    } catch (error) {
      throw new HttpException(500, error);
    }
  }

  static async getUserById(id: number) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      return user;
    } catch (error) {
      throw new HttpException(500, error);
    }
  }

  static async getUserByEmail(email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      return user;
    } catch (error) {
      throw new HttpException(500, error);
    }
  }

  static async deleteUser(id: number) {
    try {
      const user = await prisma.user.delete({
        where: { id },
      });
      return user;
    } catch (error) {
      throw new HttpException(500, error);
    }
  }

  static async updateUser(id: number, user: any) {
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: user,
      });
      return updatedUser;
    } catch (error) {
      throw new HttpException(500, error);
    }
  }

  static async getAllUsers() {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      throw new HttpException(500, error);
    }
  }
}

export { UserService };
