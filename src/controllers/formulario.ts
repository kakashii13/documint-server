import { Request, Response } from "express";
import { generatePDF } from "../services/generatePDF";
import { enviarFormularioDocumint } from "../services/mailService";
import dotenv from "dotenv";

dotenv.config();

const formularioController = async (req: Request, res: Response) => {
  const datos = req.formularioData;

  try {
    const pdfBuffer = await generatePDF(datos);
    const adjuntos = Array.isArray(req.files) // Multer can provide files as array or object
      ? []
      : (req.files &&
          (req.files as { [fieldname: string]: Express.Multer.File[] })[
            "adjuntos"
          ]) ||
        [];

    await enviarFormularioDocumint(
      pdfBuffer,
      adjuntos,
      process.env.MAIL_DESTINATION || ""
    );

    res.status(200).json({
      message: "PDF generado y enviado por correo",
    });
  } catch (err) {
    console.error("Error al generar o enviar el PDF:", err);
    res.status(500).json({ error: "Error al procesar el formulario" });
  }
};

export default formularioController;
