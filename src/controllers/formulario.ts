import { NextFunction, Request, Response } from "express";
import { generatePDF } from "../utils/generatePDF";
import { enviarFormularioDocumint } from "../utils/mailService";
import dotenv from "dotenv";
import { RequestCustom } from "../types/types";
import { UserService } from "../services/users";
import { generateReferenceNumber } from "../utils/generateReferenceNumber";

dotenv.config();

const formularioController = async (
  req: RequestCustom,
  res: Response,
  next: NextFunction
) => {
  const datos = req.formularioData;
  const advisor = req.advisor;
  try {
    const user = await UserService.getUserById(advisor?.userId || 0);

    const pdfBuffer = await generatePDF(datos);
    const adjuntos = Array.isArray(req.files) // Multer can provide files as array or object
      ? []
      : (req.files &&
          (req.files as { [fieldname: string]: Express.Multer.File[] })[
            "adjuntos"
          ]) ||
        [];

    if (!user || !advisor) {
      return next(new Error("Usuario o asesor no encontrado."));
    }
    const destinatarios = [user?.email, advisor?.email];

    const referenceNumber = generateReferenceNumber();
    const asunto = `Formulario de ${datos.nombre} - ${datos.dni} - ${referenceNumber}`;

    await enviarFormularioDocumint(pdfBuffer, adjuntos, destinatarios, asunto);

    res.status(200).send({
      message: `Formulario enviado con exito, número de referencia: ${referenceNumber}`,
    });
  } catch (err) {
    console.error("Error al enviar el formulario:", err);
    next(err);
  }
};

export default formularioController;
