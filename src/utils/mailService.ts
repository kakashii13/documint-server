// services/mailService.ts
import { Resend } from "resend";
import dotenv from "dotenv";
import { HttpException } from "../services/httpException";
import { invitationTemplate } from "../templates/invitation";
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

    return response;
  } catch (error) {
    throw new HttpException(500, `Error al enviar el correo: ${error}`);
  }
}

class SendEmail {
  static async sendInvitation(
    destinatario: string,
    name: string,
    link: string
  ) {
    try {
      const response = await resend.emails.send({
        from: "Documint <no-reply@documint.ar>",
        to: destinatario,
        subject: "Activación de cuenta - Documint",
        html: invitationTemplate(name, link),
      });
      return response;
    } catch (error) {
      throw new HttpException(500, `Error al enviar el correo: ${error}`);
    }
  }
}

export { SendEmail };
