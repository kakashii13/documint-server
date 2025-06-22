import dayjs from "dayjs";
import fs from "fs";
import path from "path";
import PdfPrinter from "pdfmake";

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
  return new Promise((resolve, reject) => {
    // Leer y convertir logo a Base64
    const logoPath = path.join(__dirname, "../assets/logo.png");
    const logoBuffer = fs.readFileSync(logoPath);
    const logoBase64 = logoBuffer.toString("base64");
    const firmaBase64 = data?.firma;

    const docDefinition = {
      content: [
        {
          image: `data:image/png;base64,${logoBase64}`,
          width: 500,
          margin: [0, 0, 0, 10],
        },
        {
          columns: [
            {
              text: "Apellido y Nombre:",
              bold: true,
              width: "auto",
              margin: [0, 0, 5, 0],
            },
            { text: data.nombre ?? "", width: "auto" },
          ],
          margin: [0, 2],
        },
        {
          columns: [
            {
              text: "Fecha de nacimiento:",
              bold: true,
              width: 120,
              margin: [0, 0, 4, 0],
            },
            { text: data.fechaNac ?? "", width: 70 },
            { text: "Tipo de doc.:", bold: true, width: 90 },
            { text: data.tipoDoc ?? "", width: 50 },
            {
              text: "Documento:",
              bold: true,
              margin: [0, 0, 4, 0],
              width: "auto",
            },
            { text: String(data.cuil).slice(2, 10) ?? "", width: 60 },
            { text: "Sexo:", bold: true, width: "auto", margin: [0, 0, 4, 0] },
            { text: data.sexo, width: 10 },
          ],
          margin: [0, 2],
        },
        {
          columns: [
            {
              text: "Nacionalidad:",
              bold: true,
              width: "auto",
              margin: [0, 0, 4, 0],
            },
            { text: data.nacionalidad ?? "", width: 80 },
            {
              text: "Estado civil:",
              bold: true,
              width: "auto",
              margin: [0, 0, 4, 0],
            },
            { text: data.estadoCivil ?? "", width: 80, margin: [0, 0, 4, 0] },
            { text: "CUIL:", bold: true, width: "auto", margin: [0, 0, 4, 0] },
            { text: data.cuil ?? "", width: 100 },
          ],
          margin: [0, 2],
        },
        {
          columns: [
            { text: "Calle:", bold: true, width: "auto", margin: [0, 0, 4, 0] },
            { text: data.calle ?? "", width: 100 },
            {
              text: "Calle numero:",
              bold: true,
              width: "auto",
              margin: [0, 0, 4, 0],
            },
            { text: data.numero ?? "", width: 30 },
            { text: "Piso:", bold: true, width: "auto", margin: [0, 0, 4, 0] },
            { text: data.piso ?? "", width: 30 },
            { text: "Depto:", bold: true, width: "auto", margin: [0, 0, 4, 0] },
            { text: data.dto ?? "", width: 30 },
          ],
          margin: [0, 2],
        },
        {
          columns: [
            {
              text: "Entre calles:",
              bold: true,
              width: "auto",
              margin: [0, 0, 4, 0],
            },
            { text: data.entreCalles ?? "", width: 100 },
            {
              text: "Tel. 1:",
              bold: true,
              width: "auto",
              margin: [0, 0, 4, 0],
            },
            { text: data.tel1 ?? "", width: 80 },
            {
              text: "Tel. 2:",
              bold: true,
              width: "auto",
              margin: [0, 0, 4, 0],
            },
            { text: data.tel2 ?? "", width: 80 },
          ],
          margin: [0, 2],
        },
        {
          columns: [
            {
              text: "Localidad:",
              bold: true,
              width: "auto",
              margin: [0, 0, 4, 0],
            },
            { text: data.localidad ?? "", width: 80 },
            { text: "C.P.:", bold: true, width: "auto", margin: [0, 0, 4, 0] },
            { text: data.cp ?? "", width: 50 },
            {
              text: "Provincia:",
              bold: true,
              width: "auto",
              margin: [0, 0, 4, 0],
            },
            { text: data.provincia ?? "", width: 80 },
          ],
          margin: [0, 2],
        },

        {
          columns: [
            {
              text: "Empresa:",
              bold: true,
              width: "auto",
              margin: [0, 0, 4, 0],
            },
            { text: data.empresa ?? "", width: 100 },
            {
              text: "CUIT de la empresa:",
              bold: true,
              width: "auto",
              margin: [0, 0, 4, 0],
            },
            { text: data.cuitEmpresa ?? "", width: 100 },
          ],
          margin: [0, 2],
        },
        {
          columns: [
            {
              text: "Lugar de trabajo:",
              bold: true,
              width: "auto",
              margin: [0, 0, 4, 0],
            },
            { text: data.calleEmpresa ?? "", width: 100 },
            {
              text: "Puesto:",
              bold: true,
              width: "auto",
              margin: [0, 0, 4, 0],
            },
            { text: data.puesto ?? "", width: 100 },
          ],
          margin: [0, 2],
        },
        {
          columns: [
            {
              text: "Localidad:",
              bold: true,
              width: "auto",
              margin: [0, 0, 4, 0],
            },
            { text: data.localidadEmpresa ?? "", width: 100 },
            { text: "C.P.:", bold: true, width: "auto", margin: [0, 0, 4, 0] },
            { text: data.cpEmpresa ?? "", width: 60 },
            {
              text: "Provincia:",
              bold: true,
              width: "auto",
              margin: [0, 0, 4, 0],
            },
            { text: data.provinciaEmpresa ?? "", width: 80 },
          ],
          margin: [0, 2],
        },

        {
          text: "INFORMACIÓN MÉDICA",
          style: "subheader",
          margin: [0, 8, 0, 4],
        },

        {
          columns: [
            {
              text: "Tuvo presión alta:",
              bold: true,
              width: "auto",
              margin: [0, 0, 4, 0],
            },
            {
              text: data.presionAlta ? "Sí" : "No",
              width: 40,
              margin: [0, 0, 4, 0],
            },
            {
              text: "Cuánto hace:",
              bold: true,
              width: "auto",
              margin: [0, 0, 4, 0],
            },
            { text: data.presionAltaDesde ?? "", width: 100 },
          ],
          margin: [0, 2],
        },
        {
          columns: [
            { text: "Fuma:", bold: true, width: "auto", margin: [0, 0, 4, 0] },
            { text: data.fuma ? "Sí" : "No", width: 40, margin: [0, 0, 4, 0] },
            {
              text: "Cuántos por día:",
              bold: true,
              width: "auto",
              margin: [0, 0, 4, 0],
            },
            { text: data.cantFuma ?? "", width: 100 },
          ],
          margin: [0, 2],
        },
        {
          columns: [
            {
              text: "Diabetes:",
              bold: true,
              width: "auto",
              margin: [0, 0, 4, 0],
            },
            {
              text: data.diabetes ? "Sí" : "No",
              width: 40,
              margin: [0, 0, 4, 0],
            },
            {
              text: "Desde cuándo:",
              bold: true,
              width: "auto",
              margin: [0, 0, 4, 0],
            },
            { text: data.diabetesDesde ?? "", width: 100 },
          ],
          margin: [0, 2],
        },
        {
          columns: [
            {
              text: "Tuvo alguna operación:",
              bold: true,
              width: "auto",
              margin: [0, 0, 4, 0],
            },
            {
              text: data.operaciones ? "Sí" : "No",
              width: 60,
              margin: [0, 0, 4, 0],
            },
            {
              text: "Toma algún remedio:",
              bold: true,
              width: "auto",
              margin: [0, 0, 4, 0],
            },
            {
              text: data.medicamentos ? "Sí" : "No",
              width: 60,
              margin: [0, 0, 4, 0],
            },
          ],
          margin: [0, 2],
        },
        {
          columns: [
            {
              text: "Es alérgico a medicamentos:",
              bold: true,
              width: "auto",
              margin: [0, 0, 4, 0],
            },
            { text: data.alergiasMedicamentos ? "Sí" : "No", width: 60 },
            {
              text: "Cuáles:",
              bold: true,
              width: "auto",
              margin: [0, 0, 4, 0],
            },
            { text: data.alergiasMedicamentosCuales ?? "", width: 150 },
          ],
          margin: [0, 2],
        },
        {
          columns: [
            {
              text: "Observaciones: ",
              bold: true,
              width: "auto",
              margin: [0, 0, 4, 0],
            },
            {
              text: `${data.observaciones ?? ""}`,
            },
          ],
          margin: [0, 5],
        },

        { text: "FAMILIARES", style: "subheader", margin: [0, 8, 0, 4] },

        {
          table: {
            widths: ["*", "*", "*", "*", "*"],
            body: [
              ["Parentesco", "Nombre", "Edad", "CUIL", "Fecha de Nac"],
              ...(data.familiares ?? [])
                .slice(0, 5)
                .map((f: any) => [
                  f.parentesco ?? "",
                  f.nombre ?? "",
                  f.edad ?? "",
                  f.cuil ?? "",
                  f.fechaNac ?? "",
                ]),
            ],
          },
        },
        {
          columns: [
            {
              text: "Firma: ",
              bold: true,
              width: "auto",
              margin: [0, 20, 4, 0],
            },
            {
              image: firmaBase64,
              width: 150,
              alignment: "left",
              margin: [0, 20, 4, 0],
            },
          ],
          alignment: "center",
        },
        {
          columns: [
            {
              text: `Fecha: `,
              width: "auto",
              bold: true,
              margin: [0, 20, 4, 0],
            },
            {
              text: dayjs().format("DD/MM/YYYY"),
              width: "auto",
              margin: [0, 20, 0, 0],
            },
          ],
        },
      ],
      styles: {
        header: {
          fontSize: 14,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        subheader: {
          bold: true,
          fontSize: 12,
          decoration: "underline",
        },
      },
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    const chunks: Buffer[] = [];

    pdfDoc.on("data", (chunk) => chunks.push(chunk));
    pdfDoc.on("end", () => resolve(Buffer.concat(chunks)));
    pdfDoc.on("error", reject);

    pdfDoc.end();
  });
}
