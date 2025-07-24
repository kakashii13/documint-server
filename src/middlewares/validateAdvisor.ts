import { Request, Response, NextFunction } from "express";
import { HttpException } from "../services/httpException";
import z from "zod";
import AdvisorsService from "../services/advisors";
import { RequestCustom, TokenPayload } from "../types/types";

class ValidateAdvisorMiddleware {
  static async validateFields(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, name, email } = req.body;
      if (!userId || !name || !email) {
        throw new HttpException(
          400,
          "Debe proporcionar userId, nombre y correo electrónico."
        );
      }

      const schema = z.object({
        userId: z.number().int().positive(),
        name: z.string().min(1, "El nombre es requerido"),
        email: z.string().email("El correo electrónico no es válido"),
      });

      const result = schema.safeParse(req.body);

      if (!result.success) {
        const errorMessage = result.error.errors
          .map((err) => err.message)
          .join(" ");
        return next(new HttpException(400, errorMessage));
      }
      next();
    } catch (error) {
      next(error);
    }
  }
  static async validateAdvisorId(
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ) {
    const { advisorId } = req.params;
    if (!advisorId || isNaN(Number(advisorId))) {
      return next(new HttpException(400, "El ID del asesor es inválido."));
    }

    const advisor = await AdvisorsService.getAdvisorById(Number(advisorId));
    if (!advisor) {
      return next(new HttpException(404, "Asesor no encontrado."));
    }
    req.advisor = advisor;
    next();
  }

  static async validateAdvisorOwnership(
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ) {
    const { userId } = req.params;
    const token = req.token as TokenPayload;
    const advisor = req.advisor;

    if (token.role == "admin") {
      return next();
    }

    const parsedUserId = Number(userId);

    // verify if userId from URL is a number and matches the token userId
    // means the user is trying to access their own advisor
    if (parsedUserId !== token.userId) {
      return next(
        new HttpException(403, "No tienes permiso para acceder a este recurso.")
      );
    }

    // verify if advisorId from URL matches the advisor userId
    // means the user is trying to access their own advisor
    if (advisor?.userId !== parsedUserId) {
      return next(
        new HttpException(403, "No tienes permiso para acceder a este asesor.")
      );
    }
    next();
  }

  static async checkSlug(
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ) {
    const { slug } = req.params;
    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return next(
        new HttpException(400, "El link es inválido, contactese con su asesor.")
      );
    }

    const advisor = await AdvisorsService.getAdvisorBySlug(slug);

    req.advisor = advisor;
    next();
  }
}

export default ValidateAdvisorMiddleware;
