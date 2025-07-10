import { Response, NextFunction } from "express";
import { RequestCustom, TokenPayload } from "../types/types";
import { TokenService } from "../services/token";

class ValidateToken {
  static validateToken(
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ): void {
    try {
      const authorizationHeader = req.get("Authorization");
      if (!authorizationHeader) {
        throw new Error("Debe proporcionar un token de autorización.");
      }
      const token = TokenService.verifyToken(
        authorizationHeader
      ) as TokenPayload;

      req.token = token;
      next();
    } catch (error) {
      next(error);
    }
  }
}

export { ValidateToken };
