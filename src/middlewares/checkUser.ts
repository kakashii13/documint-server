import { Request, Response, NextFunction } from "express";
import { HttpException } from "../services/httpException";
import { compare } from "bcrypt";
import { UserService } from "../services/users";
import { RequestCustom } from "../types/types";

// TODO: agregar metodo que chequee que envia la info para crear un nuevo usuario

class CheckUserMiddleware {
  static async checkUserAndPassword(
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { data } = req.body;

      if (!data || !data.email || !data.password) {
        throw new HttpException(400, "Email y contraseña son requeridos");
      }

      const user = await UserService.getUserByEmail(data.email);

      if (!user) {
        throw new HttpException(404, "Usuario no encontrado");
      }

      const isPasswordValid =
        (await compare(data.password, user.hash_password)) ?? false;

      if (!isPasswordValid) {
        throw new HttpException(401, "Contraseña incorrecta");
      }

      req.user = user;
    } catch (error) {
      next(error);
    }
  }
}

export { CheckUserMiddleware };
