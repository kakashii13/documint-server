import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/users";
import AdvisorsService from "../services/advisors";

/**
 * 
model User {
  id             Int      @id @default(autoincrement())
  clientId       Int?
  name           String
  email          String   @unique
  hash_password  String
  role           String
  active         Boolean  @default(false)

  client         Client?  @relation(fields: [clientId], references: [id])
  advisors       Advisor[]
}
 */

class UserController {
  static createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { user } = req.body;
      const newUser = await UserService.createUser(user);
      res.status(201).send({
        message: "Usuario creado satisfactoriamente.",
        user: newUser,
      });
    } catch (error) {
      next(error);
    }
  };

  static getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      const user = await UserService.getUserById(Number(id));
      if (!user) {
        return res.status(404).send({
          message: "Usuario no encontrado.",
        });
      }

      res.status(200).send({
        message: "Usuario obtenido satisfactoriamente.",
        user: user,
      });
    } catch (error) {
      next(error);
    }
  };

  static deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      const user = await UserService.deleteUser(Number(id));
      if (!user) {
        return res.status(404).send({
          message: "Usuario no encontrado.",
        });
      }

      res.status(200).send({
        message: "Usuario eliminado satisfactoriamente.",
      });
    } catch (error) {
      next(error);
    }
  };

  // // static updateUser = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   try {
  //     const { id } = req.params;
  //     const { user } = req.body;

  //     const updatedUser = await UserService.updateUser(Number(id), user);
  //     if (!updatedUser) {
  //       return res.status(404).send({
  //         message: "Usuario no encontrado.",
  //       });
  //     }

  //     res.status(200).send({
  //       message: "Usuario actualizado satisfactoriamente.",
  //       user: updatedUser,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
  static getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const users = await UserService.getAllUsers();
      if (!users || users.length === 0) {
        return res.status(404).send({
          message: "No se encontraron usuarios.",
        });
      }

      res.status(200).send({
        message: "Usuarios obtenidos satisfactoriamente.",
        users: users,
      });
    } catch (error) {
      next(error);
    }
  };

  static getAdvisorsByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.params;

      const advisors = await UserService.getAdvisorsByUserId(Number(userId));

      res.status(200).send({
        message: "Asesores obtenidos satisfactoriamente.",
        advisors: advisors,
      });
    } catch (error) {
      next(error);
    }
  };

  static async deleteAdvisor(req: Request, res: Response, next: NextFunction) {
    try {
      const { advisorId } = req.params;

      const result = await AdvisorsService.deleteAdvisor(Number(advisorId));
      if (!result) {
        return res.status(404).send({
          message: "Asesor no encontrado",
        });
      }

      res.status(200).send({
        message: "Asesor eliminado satisfactoriamente.",
      });
    } catch (error) {
      next(error);
    }
  }
}

export { UserController };
