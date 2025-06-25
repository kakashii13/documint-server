// services/mailService.ts
import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

interface ArchivoAdjunto {
  originalname: string;
  buffer: Buffer;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function enviarFormularioDocumint(
  pdf: Buffer,
  adjuntos: ArchivoAdjunto[],
  destinatarios: string[],
  asunto: string = "Formulario recibido"
) {
  const attachments = [
    {
      filename: "formulario.pdf",
      content: pdf.toString("base64"),
    },
    ...adjuntos.map((a) => ({
      filename: a.originalname,
      content: a.buffer.toString("base64"),
    })),
  ];

  try {
    const response = await resend.emails.send({
      from: "Documint <no-reply@documint.ar>",
      to: destinatarios,
      subject: asunto,
      text: "Adjuntamos el formulario completo con los archivos enviados.",
      attachments,
    });

    console.log("Mensaje enviado:", response);
    return response;
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw error;
  }
}
