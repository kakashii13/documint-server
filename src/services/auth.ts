import { compare } from "bcrypt";
import { User } from "../types/types";
import { hashValue } from "../utils/hashValue";
import { HttpException } from "./httpException";
import { InvitationService } from "./invitation";
import { TokenService } from "./token";
import { UserService } from "./users";
import { nanoid } from "nanoid";
import { SendEmail } from "../utils/mailService";
import { prisma } from "../prismaClient";
import { createHash } from "crypto";
class AuthService {
  static async login(user: User) {
    try {
      const token = TokenService.createToken({
        role: user.role,
        userId: user.id,
      });

      const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        clientId: user.clientId,
      };

      return { userData, token };
    } catch (error) {
      throw new HttpException(500, "Error al iniciar sesión.");
    }
  }
  static async activateAccount(token: string, password: string) {
    try {
      const invitation = await InvitationService.getInvitationByToken(token);

      if (!invitation || invitation.used) {
        throw new HttpException(400, "Invitación no válida o ya utilizada.");
      }
      const hash_password = await hashValue(password);

      await UserService.updateUser({
        userId: invitation.userId,
        hash_password,
      });

      await InvitationService.updateInvitation({
        userId: invitation.userId,
        used: true,
      });
    } catch (error) {
      throw new HttpException(500, `Error generado en Auth.service: ${error}`);
    }
  }
  static async requestResetPassword(email: string): Promise<void> {
    try {
      const user = await UserService.getUserByEmail(email);

      if (!user) {
        return;
      }

      const rawToken = nanoid(32);
      const tokenHash = createHash("sha256").update(rawToken).digest("hex");

      await prisma.passwordResetToken.deleteMany({
        where: { userId: user.id },
      });

      await prisma.passwordResetToken.create({
        data: {
          tokenHash: tokenHash,
          userId: user.id,
          expiresAt: new Date(Date.now() + 3600 * 1000), // 1 hora de validez
        },
      });

      const resetLink = `${process.env.FRONTEND_URL}/reset-password/${encodeURIComponent(rawToken)}/${user.id}`;

      await SendEmail.sendResetPassword(user.email, resetLink);
    } catch (error) {
      throw new HttpException(
        500,
        `Error al solicitar el restablecimiento: ${error}`
      );
    }
  }

  static async resetPassword(token: string, password: string): Promise<void> {
    try {
      const tokenHash = createHash("sha256").update(token).digest("hex");

      const resetToken = await prisma.passwordResetToken.findFirst({
        where: {
          tokenHash,
          expiresAt: { gte: new Date() }, // Verifica que el token no haya expirado
        },
        include: { user: true },
      });

      if (!resetToken) {
        throw new HttpException(400, "Token inválido o expirado.");
      }

      const hash_password = await hashValue(password);

      await prisma.$transaction([
        prisma.user.update({
          where: { id: resetToken.user.id },
          data: { hash_password },
        }),
        prisma.passwordResetToken.delete({
          where: { id: resetToken.id },
        }),
      ]);
    } catch (error) {
      throw new HttpException(
        500,
        `Error al restablecer la contraseña: ${error}`
      );
    }
  }
}

export { AuthService };
