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

  static async getInvitationByUserId(userId: number) {
    try {
      const invitation = await prisma.invitation.findUnique({
        where: {
          userId: userId,
        },
      });
      return invitation;
    } catch (error) {
      throw new HttpException(500, `Error en invitationService.ts: ${error}`);
    }
  }

  static async getInvitationByToken(token: string) {
    try {
      const invitation = await prisma.invitation.findUnique({
        where: { token: token },
      });
      return invitation;
    } catch (error) {
      throw new HttpException(500, `Error en invitationService.ts: ${error}`);
    }
  }

  static async updateInvitation(invitation: { userId: number; used: boolean }) {
    try {
      await prisma.invitation.update({
        where: { userId: invitation.userId },
        data: { used: invitation.used },
      });
    } catch (error) {
      throw new HttpException(500, `Error en invitationService.ts: ${error}`);
    }
  }
}

export { InvitationService };
