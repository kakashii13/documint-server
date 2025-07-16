import AdvisorsService from "../services/advisors";
import { Request, Response, NextFunction } from "express";
import { RequestCustom } from "../types/types";
import { HttpException } from "../services/httpException";

class AdvisorsController {
  static async createAdvisor(
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId, name, email } = req.body;
      const emailToLowerCase = email.toLowerCase();
      const advisorCreated = await AdvisorsService.createAdvisor(
        userId,
        name,
        emailToLowerCase
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

  static async deleteAdvisor(req: Request, res: Response, next: NextFunction) {
    try {
      const { advisorId } = req.params;

      const result = await AdvisorsService.deleteAdvisor(Number(advisorId));
      if (!result) {
        throw new HttpException(404, "Asesor no encontrado.");
      }

      res.status(200).send({
        message: "Asesor eliminado satisfactoriamente.",
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

  static async getAdvisorBySlug(
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { slug } = req.params;
      if (!slug) {
        return res.status(400).send({
          message: "El slug es requerido.",
        });
      }

      const advisor = await AdvisorsService.getAdvisorBySlug(slug);

      if (!advisor) {
        return res.status(404).send({
          message: "Asesor no encontrado.",
        });
      }

      // por temas de seguridad, solo retorno el nombre del asesor
      res.status(200).send({
        message: "Asesor obtenido exitosamente.",
        advisor: advisor.name,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AdvisorsController;
