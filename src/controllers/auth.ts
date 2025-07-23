import { Response, NextFunction } from "express";
import { RequestCustom, TokenPayload, User } from "../types/types";
import { AuthService } from "../services/auth";
import z from "zod";
import { UserService } from "../services/users";

class AuthController {
  static async login(req: RequestCustom, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      const data = {
        ipAddress: req.ip || "",
        userAgent: req.headers["user-agent"] || "",
      };

      const { jwtToken, rawToken } = await AuthService.login(
        user as User,
        data
      );

      // remove hash_password and googleId
      const userWithoutPassword = {
        ...user,
        hash_password: undefined,
        googleId: undefined,
      };

      res
        .cookie("refreshToken", rawToken, {
          httpOnly: true,
          secure: false, // cambiar a true en producción
          sameSite: "lax",
          path: "/",
        })
        .status(200)
        .send({
          message: "Login exitoso",
          user: userWithoutPassword,
          token: jwtToken,
        });
    } catch (error) {
      next(error);
    }
  }

  static async loginWithGoogle(
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = req.user;
      const data = {
        ipAddress: req.ip || "",
        userAgent: req.headers["user-agent"] || "",
      };

      const { jwtToken, rawToken } = await AuthService.login(
        user as User,
        data
      );

      // remove hash_password and googleId
      const userWithoutPassword = {
        ...user,
        hash_password: undefined,
        googleId: undefined,
      };

      res
        .cookie("refreshToken", rawToken, {
          httpOnly: true,
          secure: false, // cambiar a true en producción
          sameSite: "lax",
          path: "/",
        })
        .redirect(
          `${process.env.FRONTEND_URL}/login/success?accessToken=${jwtToken}` ||
            "/"
        );
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.token as TokenPayload;

      const user = await UserService.getUserById(token.userId);

      if (!user) {
        return res.status(401).send({ message: "Usuario no autenticado" });
      }

      // remove hash_password and googleId
      const userWithoutPassword = {
        ...user,
        hash_password: undefined,
        googleId: undefined,
      };

      res.status(200).send({ user: userWithoutPassword });
    } catch (error) {
      next(error);
    }
  }

  static async refreshToken(
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { refreshToken } = req.cookies;

      const newToken = await AuthService.createNewAccessToken(refreshToken);
      res.status(200).send({ token: newToken });
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
