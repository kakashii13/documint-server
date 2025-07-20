import { prisma } from "../prismaClient";
import { HttpException } from "./httpException";

type Session = {
  userId: number;
  ip: string;
  userAgent: string;
  expiresAt: Date;
  refreshToken?: string;
  id: number;
};

class UserSessionService {
  static async createSession(data: {
    userId: number;
    ipAddress: string;
    userAgent: string;
    expiresAt: Date;
    refreshToken: string;
  }): Promise<Session> {
    try {
      await this.removeSession(data.userId, data.ipAddress, data.userAgent);
      const existingSession = await this.getActiveSessions(data.userId);

      if (existingSession.length >= 3) {
        throw new HttpException(
          500,
          "Número máximo de sesiones activas alcanzado. Debe cerrar una sesión antes de iniciar una nueva."
        );
      }

      const session = await prisma.userSession.create({
        data: {
          userId: data.userId,
          refreshToken: data.refreshToken,
          ip: data.ipAddress,
          userAgent: data.userAgent,
          expiresAt: data.expiresAt,
        },
      });

      return session;
    } catch (error) {
      throw new HttpException(500, `Error al crear la sesión: ${error}`);
    }
  }

  static async removeSession(
    userId: number,
    ip: string,
    userAgent: string
  ): Promise<void> {
    try {
      await prisma.userSession.deleteMany({
        where: {
          userId,
          ip,
          userAgent,
        },
      });
    } catch (error: any) {
      throw new HttpException(
        500,
        `Error al eliminar la sesión: ${error.message}`
      );
    }
  }

  static async removeAllSessions(userId: number): Promise<void> {
    try {
      await prisma.userSession.deleteMany({
        where: { userId },
      });
    } catch (error: any) {
      throw new HttpException(
        500,
        `Error al eliminar todas las sesiones del usuario: ${error.message}`
      );
    }
  }

  static async getActiveSessions(userId: number): Promise<Session[]> {
    try {
      const sessions = await prisma.userSession.findMany({
        where: { userId },
      });

      return sessions;
    } catch (error: any) {
      throw new HttpException(
        500,
        `Error al obtener las sesiones activas: ${error.message}`
      );
    }
  }

  static async getSessionByRefreshToken(
    refreshToken: string
  ): Promise<Session | null> {
    try {
      const session = await prisma.userSession.findFirst({
        where: { refreshToken },
      });

      return session;
    } catch (error: any) {
      throw new HttpException(
        500,
        `Error al obtener la sesión por token de actualización: ${error.message}`
      );
    }
  }

  static async getSessionById(sessionId: number): Promise<Session | null> {
    try {
      const session = await prisma.userSession.findUnique({
        where: { id: sessionId },
      });

      return session;
    } catch (error: any) {
      throw new HttpException(
        500,
        `Error al obtener la sesión por ID: ${error.message}`
      );
    }
  }
}

export { UserSessionService };
