import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/users";
import AdvisorsService from "../services/advisors";
import { HttpException } from "../services/httpException";

class UserController {
  static createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { user } = req.body;
      const newUser = await UserService.createUser(user);

      if (!newUser) {
        throw new HttpException(400, "Error al crear el usuario.");
      }

      // remove hash_password from the response
      const { hash_password, ...userWithoutPassword } = newUser;

      res.status(201).send({
        message: "Usuario creado satisfactoriamente.",
        user: userWithoutPassword,
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
        throw new HttpException(404, "Usuario no encontrado.");
      }

      // Exclude password from user object
      const { hash_password, ...userWithoutPassword } = user;

      res.status(200).send({
        message: "Usuario obtenido satisfactoriamente.",
        user: userWithoutPassword,
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
        throw new HttpException(404, "Usuario no encontrado.");
      }

      res.status(200).send({
        message: "Usuario eliminado satisfactoriamente.",
      });
    } catch (error) {
      next(error);
    }
  };

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, userId, name } = req.body;

      const emailExist = await UserService.getUserByEmail(email);

      if (emailExist && emailExist.id !== Number(userId)) {
        throw new HttpException(400, "El email ya está registrado.");
      }

      const updatedUser = await UserService.updateUser({
        userId: Number(userId),
        email,
        name,
      });

      if (!updatedUser) {
        throw new HttpException(404, "Usuario no encontrado.");
      }

      const { hash_password, ...userWithoutPassword } = updatedUser;

      res.status(200).send({
        message: "Usuario actualizado satisfactoriamente.",
        user: userWithoutPassword,
      });
    } catch (error) {
      next(error);
    }
  }

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

      // Exclude password from each user object
      const usersWithoutPassword = users.map((user) => {
        const { hash_password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });

      res.status(200).send({
        message: "Usuarios obtenidos satisfactoriamente.",
        users: usersWithoutPassword,
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
}

export { UserController };
