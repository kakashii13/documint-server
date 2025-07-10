import { Response, NextFunction } from "express";
import { RequestCustom, User } from "../types/types";
import { AuthService } from "../services/auth";

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
}

export { AuthController };
