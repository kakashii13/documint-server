import { Request, Response, NextFunction } from "express";
import { HttpException } from "../services/httpException";
import { compare } from "bcrypt";
import { UserService } from "../services/users";
import { RequestCustom } from "../types/types";
import { z } from "zod";

// TODO: agregar metodo que chequee que envia la info para crear un nuevo usuario

class ValidateUserMiddleware {
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

  static async checkFields(req: Request, res: Response, next: NextFunction) {
    const { user } = req.body;
    if (!user) {
      return next(
        new HttpException(400, "Debe proporcionar los datos del usuario.")
      );
    }

    const schema = z.object({
      user: z.object({
        email: z
          .string({ required_error: "Debe proporcionar un email." })
          .email("Email inválido"),
        name: z
          .string({ required_error: "Debe proporcionar un nombre." })
          .min(1, { message: "Nombre es requerido" }),
        // number or null
        clientId: z
          .number({ required_error: "Debe proporcionar un ID de cliente." })
          .nullable(),
        role: z
          .string({ required_error: "Debe proporcionar un rol." })
          .min(1, { message: "Rol es requerido." }),
      }),
    });

    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errorMessage = result.error.errors
        .map((err) => err.message)
        .join(" ");
      console.error(result.error);
      return next(new HttpException(400, errorMessage));
    }

    next();
  }
}

export { ValidateUserMiddleware };
