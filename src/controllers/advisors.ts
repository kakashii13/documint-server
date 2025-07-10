import AdvisorsService from "../services/advisors";
import { Request, Response, NextFunction } from "express";
import { RequestCustom } from "../types/types";

class AdvisorsController {
  static async createAdvisor(
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId, name, email } = req.body;
      const advisorCreated = await AdvisorsService.createAdvisor(
        userId,
        name,
        email
      );

      res.status(201).send({
        message: "Asesor creado exitosamente.",
        advisor: advisorCreated,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAdvisorById(
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const advisor = await AdvisorsService.getAdvisorById(Number(id));

      res.status(200).send({
        message: "Asesor obtenido exitosamente.",
        advisor,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateAdvisor(
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const data = req.body;
      const advisorUpdated = await AdvisorsService.updateAdvisor(
        Number(id),
        data
      );

      res.status(200).send({
        message: "Asesor actualizado exitosamente.",
        advisor: advisorUpdated,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteAdvisor(
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const advisorDeleted = await AdvisorsService.deleteAdvisor(Number(id));

      res.status(200).send({
        message: "Asesor eliminado exitosamente.",
        advisor: advisorDeleted,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAdvisors(
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ) {
    try {
      const advisors = await AdvisorsService.getAdvisors();

      res.status(200).send({
        message: "Asesores obtenidos exitosamente.",
        advisors,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AdvisorsController;
