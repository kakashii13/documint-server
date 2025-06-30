import { Response, NextFunction } from "express";
import { RequestCustom, User } from "../types/types";
import { AuthService } from "../services/auth";

class AuthController {
  static async login(req: RequestCustom, res: Response, next: NextFunction) {
    try {
      const user = req.user; // esto ya esta validado por el middleware de checkUser.middleware

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
  ) {}
}

export { AuthController };
