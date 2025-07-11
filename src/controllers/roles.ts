import { Request, Response, NextFunction } from "express";
import RoleService from "../services/roles";
import { RequestCustom } from "../types/types";

class RoleController {
  static async getRoles(req: RequestCustom, res: Response, next: NextFunction) {
    try {
      const token = req.token as { role: string };

      const roles = await RoleService.getRoles(token.role);
      res.status(200).send({
        message: "Roles obtenidos correctamente",
        roles,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default RoleController;
