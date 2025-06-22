// services/mailService.ts
import nodemailer from "nodemailer";

interface ArchivoAdjunto {
  originalname: string;
  buffer: Buffer;
}

export async function enviarFormularioDocumint(
  pdf: Buffer,
  adjuntos: ArchivoAdjunto[],
  destinatario: string
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const attachments = [
    { filename: "formulario.pdf", content: pdf },
    ...adjuntos.map((a) => ({
      filename: a.originalname,
      content: a.buffer,
    })),
  ];

  return transporter.sendMail({
    from: `"Documint" <${process.env.MAIL_USER}>`,
    to: destinatario,
    subject: "Formulario recibido",
    text: "Adjuntamos el formulario completo con los archivos enviados.",
    attachments,
  });
}
