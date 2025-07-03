import { NextFunction, Request, Response } from "express";
import { HttpException } from "../services/httpException";
import { RequestCustom, TokenPayload } from "../types/types";

class ValidateAuthMiddleware {
  static async isAdmin(req: RequestCustom, res: Response, next: NextFunction) {
    try {
      const token = req.token as TokenPayload;
      if (!token.role || token.role !== "admin") {
        throw new HttpException(403, "Acceso denegado. Usuario no es admin.");
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  static async validateUserWithToken(
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.body;
      const token = req.token as TokenPayload;
      if (!userId || !token) {
        throw new HttpException(400, "ID de usuario y token son requeridos.");
      }

      if (userId !== token.userId) {
        throw new HttpException(403, "Acceso denegado.");
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  static async validateOwnership(
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.body;
      const { id } = req.params;
      const idParam = Number(id);
      const token = req.token as TokenPayload;

      if (token.role && token.role === "admin") {
        return next(); // Si es admin, no se valida propiedad
      }

      if (!userId || !id) {
        throw new HttpException(
          400,
          "ID de usuario y ID de recurso son requeridos."
        );
      }

      if (userId !== idParam && token.userId !== idParam) {
        throw new HttpException(
          403,
          "Acceso denegado. No eres el propietario."
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}

export { ValidateAuthMiddleware };
