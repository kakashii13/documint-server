import { Response, NextFunction, Request } from "express";
import { RequestCustom, TokenPayload } from "../types/types";
import { TokenService } from "../services/token";
import { UserSessionService } from "../services/userSession";
import { HttpException } from "../services/httpException";

class ValidateToken {
  static async validateToken(
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const authorizationHeader = req.get("Authorization");
      if (!authorizationHeader) {
        throw new HttpException(
          401,
          "Debe proporcionar un token de autorización."
        );
      }
      const token = TokenService.verifyToken(
        authorizationHeader
      ) as TokenPayload;

      if (!token || !token.userId) {
        throw new HttpException(401, "Token inválido o expirado.");
      }
      // Check if the session exists
      if (!token.sessionId) {
        throw new HttpException(
          401,
          "Token inválido. No se encontró la sesión."
        );
      }
      // validate if session is active
      const session = await UserSessionService.getSessionById(token.sessionId);

      if (!session) {
        throw new HttpException(401, "Sesión no válida o expiró.");
      }

      req.token = token;
      next();
    } catch (error) {
      next(error);
    }
  }
}

export { ValidateToken };
