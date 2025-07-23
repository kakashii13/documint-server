import { NextFunction, Request, Response } from "express";
import { HttpException } from "../services/httpException";
import { RequestCustom, TokenPayload } from "../types/types";

class ValidateAuthMiddleware {
  static validateRole(validateRoles: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        // @ts-ignore
        const token = req.token as TokenPayload;

        if (!validateRoles.includes(token.role)) {
          throw new HttpException(
            403,
            "Acceso denegado, no cuenta con los permisos suficientes."
          );
        }

        next();
      } catch (error) {
        next(error);
      }
    };
  }

  static async validateUserWithToken(
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ) {
    try {
      const rawUserId = req.query.userId as string;
      const userId = Number(rawUserId);
      if (isNaN(userId)) {
        throw new HttpException(400, "userId inválido");
      }

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
      // token.userId vs id
      const { id } = req.params; // recurso al que se accede
      const idParam = Number(id);
      const token = req.token as TokenPayload;

      if (token.role && token.role === "admin") return next();

      if (token.userId !== idParam) {
        throw new HttpException(403, "Acceso denegado.");
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}

export { ValidateAuthMiddleware };
