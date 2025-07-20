import { HttpException } from "./httpException";
import jwt, {
  JsonWebTokenError,
  JwtPayload,
  NotBeforeError,
  TokenExpiredError,
  verify,
} from "jsonwebtoken";
import dotenv from "dotenv";
import type { SignOptions } from "jsonwebtoken";
import { nanoid } from "nanoid";
import { createHash } from "crypto";

dotenv.config();

class TokenService {
  static createJWTToken(
    payload: any,
    expiresIn: number | string = "7d"
  ): string {
    try {
      const token = jwt.sign(payload, process.env.JWT_SECRET || "", {
        expiresIn: expiresIn,
      } as SignOptions);
      return token;
    } catch (error) {
      throw new HttpException(500, `No se pudo crear el token: ${error}`);
    }
  }

  static verifyToken(header: string): JwtPayload | string {
    try {
      const token: string | null = this.extractTokenFromHeader(header);
      if (!token) {
        throw new HttpException(401, "Token no proporcionado");
      }

      const tokenVerify = verify(token, process.env.JWT_SECRET || "");

      return tokenVerify;
    } catch (error: any) {
      if (error instanceof TokenExpiredError) {
        throw new HttpException(
          401,
          "Tu sesión ha finalizado. Por favor, iniciá sesión nuevamente."
        );
      } else if (error instanceof JsonWebTokenError) {
        throw new HttpException(
          401,
          "Tu sesión ya no es válida. Iniciá sesión para continuar."
        );
      } else if (error instanceof NotBeforeError) {
        throw new HttpException(401, "Token aún no es válido");
      } else {
        throw new HttpException(
          500,
          "No se pudo verificar la sesión. Volvé a iniciar sesión."
        );
      }
    }
  }

  static extractTokenFromHeader(auth: string): string | null {
    if (auth && auth.toLocaleLowerCase().startsWith("bearer ")) {
      return auth.substring(7);
    }

    return null;
  }

  static createRefreshToken() {
    try {
      // refresh token
      const rawToken = nanoid(32);
      const refreshToken = this.hashToken(rawToken);
      return { rawToken, refreshToken };
    } catch (error: any) {
      throw new HttpException(
        500,
        error.message || "Error al crear el refresh token"
      );
    }
  }

  static hashToken(token: string): string {
    try {
      return createHash("sha256").update(token).digest("hex");
    } catch (error: any) {
      throw new HttpException(
        500,
        error.message || "Error al hashear el token"
      );
    }
  }
}

export { TokenService };
