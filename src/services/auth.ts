import { User } from "../types/types";
import { hashValue } from "../utils/hashValue";
import { HttpException } from "./httpException";
import { InvitationService } from "./invitation";
import { TokenService } from "./token";
import { UserService } from "./users";
import { SendEmail } from "../utils/mailService";
import { prisma } from "../prismaClient";
import { UserSessionService } from "./userSession";

type RequestData = {
  ipAddress: string;
  userAgent: string;
};
class AuthService {
  static async login(user: User, requestData: RequestData) {
    try {
      return this.createSessionWithTokens(user, requestData);
    } catch (error: any) {
      throw new HttpException(500, error.message || "Error al iniciar sesión");
    }
  }

  static async renewSession(user: User, requestData: RequestData) {
    try {
      if (!user.id) {
        throw new HttpException(400, "Usuario no válido");
      }
      // Eliminar todas las sesiones anteriores del usuario
      await UserSessionService.removeAllSessions(user.id);

      return this.createSessionWithTokens(user, requestData);
    } catch (error: any) {
      throw new HttpException(500, error.message || "Error al renovar sesión");
    }
  }

  static async createNewAccessToken(rawToken: string) {
    try {
      const tokenHash = TokenService.hashToken(rawToken);
      const session =
        await UserSessionService.getSessionByRefreshToken(tokenHash);

      if (!session) {
        throw new HttpException(401, "Error. Vuelva a iniciar sesión.");
      }

      if (session.expiresAt < new Date()) {
        throw new HttpException(
          401,
          "Token expirado. Vuelva a iniciar sesión."
        );
      }

      const user = await UserService.getUserById(session.userId);

      const newToken = TokenService.createJWTToken(
        {
          role: user?.role,
          userId: session.userId,
          sessionId: session.id,
        },
        "6h"
      );

      return newToken;
    } catch (error: any) {
      throw new HttpException(
        500,
        error.message || "Error al refrescar el token"
      );
    }
  }

  static async activateAccount(token: string, password: string) {
    try {
      const invitation = await InvitationService.getInvitationByToken(token);

      if (!invitation || invitation.used) {
        throw new HttpException(400, "Invitación no válida o ya utilizada.");
      }

      await UserService.updatePassword(invitation.userId, password);
      await UserService.updateUser(invitation.userId, {active: true});

      await InvitationService.updateInvitation({
        userId: invitation.userId,
        used: true,
      });
    } catch (error: any) {
      throw new HttpException(
        500,
        `Error al activar la cuenta: ${error.message}`
      );
    }
  }
  static async requestResetPassword(email: string): Promise<void> {
    try {
      const user = await UserService.getUserByEmail(email);

      if (!user) {
        return;
      }

      const { rawToken, refreshToken } = TokenService.createRefreshToken();

      await prisma.passwordResetToken.deleteMany({
        where: { userId: user.id },
      });

      await prisma.passwordResetToken.create({
        data: {
          tokenHash: refreshToken,
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

  static async createSessionWithTokens(
    user: User,
    requestData: RequestData
  ): Promise<{ jwtToken: string; rawToken: string }> {
    try {
      if (!user.id) {
        throw new HttpException(400, "Usuario no válido");
      }

      const { rawToken, refreshToken } = TokenService.createRefreshToken();

      const session = await UserSessionService.createSession({
        userId: user.id,
        ipAddress: requestData.ipAddress,
        userAgent: requestData.userAgent,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días
        refreshToken,
      });

      const jwtToken = TokenService.createJWTToken(
        { role: user.role, userId: user.id, sessionId: session.id },
        "6h"
      );

      return { jwtToken, rawToken };
    } catch (error) {
      throw new HttpException(500, `Error al crear la sesión: ${error}`);
    }
  }

  static async resetPassword(token: string, password: string): Promise<void> {
    try {
      const tokenHash = TokenService.hashToken(token);

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
    } catch (error: any) {
      throw new HttpException(
        500,
        `Error al restablecer la contraseña: ${error.message}`
      );
    }
  }
}

export { AuthService };
