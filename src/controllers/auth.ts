import { Response, NextFunction } from "express";
import { RequestCustom, User } from "../types/types";
import { AuthService } from "../services/auth";
import { UserService } from "../services/users";
import { nanoid } from "nanoid";
import { SendEmail } from "../utils/mailService";
import { HttpException } from "../services/httpException";
import z from "zod";

class AuthController {
  static async login(req: RequestCustom, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      const { userData, token } = await AuthService.login(user as User);

      res.status(200).send({
        message: "Login exitoso",
        user: userData,
        token: token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async activateAccount(
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { token, password } = req.body;
      await AuthService.activateAccount(token, password);
      res.status(200).send({ message: "Cuenta activada correctamente" });
    } catch (error) {
      next(error);
    }
  }

  static async requestResetPassword(
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email } = req.body;

      const schema = z.object({
        email: z
          .string({ required_error: "El email es requerido" })
          .email("Formato de email inválido"),
      });

      schema.parse({ email });

      await AuthService.requestResetPassword(email);

      res.status(200).send({
        message: "Se ha enviado un correo para restablecer la contraseña",
      });
    } catch (error) {
      next(error);
    }
  }
  static async resetPassword(
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { token, password } = req.body;

      const schema = z.object({
        token: z.string({ required_error: "El token es requerido" }),
        password: z
          .string({ required_error: "La contraseña es requerida" })
          .min(6, "La contraseña debe tener al menos 6 caracteres"),
      });
      schema.parse({ token, password });

      await AuthService.resetPassword(token, password);
      res
        .status(200)
        .send({ message: "Contraseña restablecida correctamente" });
    } catch (error) {
      next(error);
    }
  }
}

export { AuthController };
