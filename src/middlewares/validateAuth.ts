import { NextFunction, Request, Response } from "express";
import { HttpException } from "../services/httpException";
import { RequestCustom, TokenPayload } from "../types/types";

class ValidateAuthMiddleware {
  static validateRole(validateRoles: string[]) {
    return async (req: RequestCustom, res: Response, next: NextFunction) => {
      try {
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
      // el usuario que hace la solicitud y el recurso al que se accede
      // deben ser iguales o el usuario debe ser admin

      const { userId } = req.body; // usuario que hace la solicitud
      const { id } = req.params; // recurso al que se accede
      const idParam = Number(id);
      const token = req.token as TokenPayload;

      if (token.role && token.role === "admin") {
        return next(); // si es admin, no se valida propiedad
      }

      if (!userId || !id) {
        throw new HttpException(
          400,
          "ID de usuario y ID de recurso son requeridos."
        );
      }

      // el usuario que hace la solicitud debe ser el mismo que el del recurso
      // y el token debe tener el mismo userId que el del recurso
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
