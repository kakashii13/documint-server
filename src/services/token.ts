import { HttpException } from "./httpException";
import jwt, { verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

class TokenService {
  static createToken(payload: any): string {
    try {
      const token = jwt.sign(payload, process.env.JWT_SECRET || "", {
        expiresIn: "2 days",
      });
      return token;
    } catch (error) {
      throw new HttpException(500, "No se pudo crear el token");
    }
  }

  static verifyToken(header: string): any {
    try {
      const token: string | null = this.extractTokenFromHeader(header);
      if (!token) {
        throw new HttpException(401, "Token no proporcionado");
      }

      const tokenVerify = verify(token, process.env.JWT_SECRET || "");

      if (!tokenVerify) {
        throw new HttpException(401, "Token inválido");
      }

      return tokenVerify;
    } catch (error) {
      throw new HttpException(500, "No se pudo verificar el token");
    }
  }

  static extractTokenFromHeader(auth: string): string | null {
    if (auth && auth.toLocaleLowerCase().startsWith("bearer ")) {
      return auth.substring(7);
    }

    return null;
  }
}

export { TokenService };
