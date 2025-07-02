import { Request, Response, NextFunction } from "express";
import { HttpException } from "../services/httpException";
import { compare } from "bcrypt";
import { UserService } from "../services/users";
import { RequestCustom } from "../types/types";

// TODO: agregar metodo que chequee que envia la info para crear un nuevo usuario

class CheckUserMiddleware {
  static async checkIsUserExist(
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { dataUser } = req.body;

      if (!dataUser || !dataUser.email || !dataUser.password) {
        throw new HttpException(400, "Email y contraseña son requeridos");
      }

      const user = await UserService.getUserByEmail(dataUser.email);

      if (!user) {
        throw new HttpException(404, "Usuario no encontrado");
      }

      req.user = user as RequestCustom["user"];
      next();
    } catch (error) {
      next(error);
    }
  }

  static async checkPassword(
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { dataUser } = req.body;
      const user = req.user;

      const isPasswordValid =
        (await compare(dataUser.password, user?.hash_password || "")) ?? false;

      if (!isPasswordValid) {
        throw new HttpException(401, "Contraseña incorrecta");
      }

      req.user = user as RequestCustom["user"];
      next();
    } catch (error) {
      next(error);
    }
  }

  static async checkIsActive(
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = req.user;
      if (!user?.active)
        throw new HttpException(400, "Debe activar la cuenta primero.");

      next();
    } catch (error) {
      next(error);
    }
  }
}

export { CheckUserMiddleware };
