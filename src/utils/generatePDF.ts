import fs from "fs";
import path from "path";
import PdfPrinter from "pdfmake";
import { documintDefinition } from "../templates/docDefinition";
import { HttpException } from "../services/httpException";

// Configurar fuentes
const fonts = {
  Roboto: {
    normal: "./src/fonts/Roboto-Regular.ttf",
    bold: "./src/fonts/Roboto-Medium.ttf",
    italics: "./src/fonts/Roboto-Italic.ttf",
  },
};

const printer = new PdfPrinter(fonts);

export function generatePDF(data: any): Promise<Buffer> {
  try {
    return new Promise((resolve, reject) => {
      // Leer y convertir logo a Base64
      const logoPath = path.join(__dirname, "../../assets/logo.png");
      const logoBuffer = fs.readFileSync(logoPath);
      const logoBase64 = logoBuffer.toString("base64");
      const firmaBase64 = data?.firma;

      // Definicion de los campos del pdf
      const docDefinition = documintDefinition(data, logoBase64, firmaBase64);

      const pdfDoc = printer.createPdfKitDocument(docDefinition as any);
      const chunks: Buffer[] = [];

      pdfDoc.on("data", (chunk) => chunks.push(chunk));
      pdfDoc.on("end", () => resolve(Buffer.concat(chunks)));
      pdfDoc.on("error", reject);

      pdfDoc.end();
    });
  } catch (error: any) {
    throw new HttpException(500, "Error al generar el PDF: " + error.message);
  }
}
