import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { HttpException } from "../services/httpException";
import { UserService } from "../services/users";
import { ClientService } from "../services/clients";

class ValidateClientMiddleware {
  static async validateFields(req: Request, res: Response, next: NextFunction) {
    const { client } = req.body;

    if (!client) throw new HttpException(400, "Debe proporcionar un cliente");

    const schema = z.object({
      client: z.object({
        email: z
          .string({ required_error: "Debe proporcionar un email." })
          .email("Email inválido"),
        name: z
          .string({ required_error: "Debe proporcionar un nombre." })
          .min(1, { message: "Nombre es requerido" }),
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

  static async validateClientId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { clientId } = req.params;

    if (!clientId) {
      return next(new HttpException(400, "ID del cliente es requerido."));
    }

    const schema = z.object({
      clientId: z.string().min(1, { message: "ID del cliente es requerido." }),
    });

    const result = schema.safeParse({ clientId });

    if (!result.success) {
      const errorMessage = result.error.errors
        .map((err) => err.message)
        .join(" ");
      return next(new HttpException(400, errorMessage));
    }

    const client = await ClientService.getClientById(Number(clientId));
    if (!client) {
      return next(new HttpException(404, "Cliente no encontrado."));
    }

    next();
  }

  static async validateUserOwnership(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { clientId, userId } = req.params;

    if (!clientId || !userId) {
      return next(
        new HttpException(400, "ID del cliente y usuario son requeridos.")
      );
    }

    const user = await UserService.getUserById(Number(userId));
    if (!user) {
      return next(new HttpException(404, "Usuario no encontrado."));
    }

    if (user.clientId !== Number(clientId)) {
      return next(
        new HttpException(
          403,
          "El usuario no pertenece al cliente especificado."
        )
      );
    }

    next();
  }
}

export { ValidateClientMiddleware };
