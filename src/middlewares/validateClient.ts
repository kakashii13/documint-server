import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { HttpException } from "../services/httpException";

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
}

export { ValidateClientMiddleware };
