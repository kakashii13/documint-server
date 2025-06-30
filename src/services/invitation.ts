import { HttpException } from "./httpException";
import { prisma } from "../prismaClient";
import { SendEmail } from "../utils/mailService";
import dotenv from "dotenv";
dotenv.config();

class InvitationService {
  static async createInvitation(userId: number): Promise<string> {
    try {
      const token = await this.createToken();
      const expiresAt = new Date();

      await prisma.invitation.create({
        data: {
          token: token,
          expiresAt: expiresAt,
          userId: userId,
        },
      });
      return token;
    } catch (error) {
      throw new HttpException(500, `Error en invitationService.ts: ${error}`);
    }
  }

  static async createToken() {
    try {
      const token = Math.random().toString(36).substring(2, 15);
      return token;
    } catch (error) {
      throw new HttpException(500, `Error en invitationService.ts: ${error}`);
    }
  }
}

export { InvitationService };
