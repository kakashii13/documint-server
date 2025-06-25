import dayjs from "dayjs";

export const documintDefinition = (
  data: any,
  logoBase64: string,
  firmaBase64: string
) => {
  return {
    pageMargins: [40, 40, 40, 20],
    content: [
      {
        image: `data:image/png;base64,${logoBase64}`,
        width: 595,
        absolutePosition: { x: 0, y: 0 }, // desde la esquina superior izquierda
        margin: [0, 0, 0, 10],
      },
      {
        text: "", // contenido vacío
        margin: [0, 80, 0, 10], // margen superior igual a la altura visible del logo
      },
      {
        columns: [
          {
            text: "Apellido y Nombre:",
            bold: true,
            width: "auto",
            margin: [0, 0, 4, 0],
          },
          { text: data.nombre ?? "", width: "auto", margin: [0, 0, 4, 0] },
          {
            text: "Tipo doc.:",
            bold: true,
            width: "auto",
            margin: [0, 0, 4, 0],
          },
          { text: data.tipoDoc ?? "", width: "auto", margin: [0, 0, 4, 0] },
          {
            text: "Documento:",
            bold: true,
            margin: [0, 0, 4, 0],
            width: "auto",
          },
          { text: data.dni ?? "", width: "auto", margin: [0, 0, 4, 0] },
        ],
        margin: [0, 4],
      },
      {
        columns: [
          {
            text: "Fecha de nacimiento:",
            bold: true,
            width: 120,
            margin: [0, 0, 4, 0],
          },
          { text: data.fechaNac ?? "", width: "auto", margin: [0, 0, 4, 0] },
          { text: "Sexo:", bold: true, width: "auto", margin: [0, 0, 4, 0] },
          { text: data.sexo, width: 15, margin: [0, 0, 4, 0] },
          {
            text: "Nacionalidad:",
            bold: true,
            width: "auto",
            margin: [0, 0, 4, 0],
          },
          { text: data.nacionalidad ?? "", width: 80 },
        ],
        margin: [0, 4],
      },
      {
        columns: [
          {
            text: "Estado civil:",
            bold: true,
            width: "auto",
            margin: [0, 0, 4, 0],
          },
          { text: data.estadoCivil ?? "", width: 80, margin: [0, 0, 4, 0] },
          {
            text: "Clave fiscal:",
            bold: true,
            width: "auto",
            margin: [0, 0, 4, 0],
          },
          { text: data.claveFiscal ?? "", width: 100 },
        ],
        margin: [0, 4],
      },
      {
        columns: [
          { text: "Calle:", bold: true, width: "auto", margin: [0, 0, 4, 0] },
          { text: data.calle ?? "", width: "auto", margin: [0, 0, 4, 0] },
          {
            text: "Calle numero:",
            bold: true,
            width: "auto",
            margin: [0, 0, 4, 0],
          },
          { text: data.numero ?? "", width: 30 },
          { text: "Piso:", bold: true, width: "auto", margin: [0, 0, 4, 0] },
          { text: data.piso ?? "", width: 20 },
          { text: "Depto:", bold: true, width: "auto", margin: [0, 0, 4, 0] },
          { text: data.dto ?? "", width: 20 },
          {
            text: "Entre calles:",
            bold: true,
            width: "auto",
            margin: [0, 0, 4, 0],
          },
          { text: data.entreCalles ?? "", width: "auto" },
        ],
        margin: [0, 4],
        width: "auto",
      },
      {
        columns: [
          {
            text: "Tel. 1:",
            bold: true,
            width: "auto",
            margin: [0, 0, 4, 0],
          },
          { text: data.tel1 ?? "", width: "auto", margin: [0, 0, 4, 0] },
          {
            text: "Tel. 2:",
            bold: true,
            width: "auto",
            margin: [0, 0, 4, 0],
          },
          { text: data.tel2 ?? "", width: "auto", margin: [0, 0, 4, 0] },
          {
            text: "E-mail:",
            bold: true,
            width: "auto",
            margin: [0, 0, 4, 0],
          },
          { text: data.email ?? "", width: "auto", margin: [0, 0, 4, 0] },
        ],
        margin: [0, 4],
      },
      {
        columns: [
          {
            text: "Localidad:",
            bold: true,
            width: "auto",
            margin: [0, 0, 4, 0],
          },
          { text: data.localidad ?? "", width: 100 },
          { text: "C.P.:", bold: true, width: "auto", margin: [0, 0, 4, 0] },
          { text: data.cp ?? "", width: 30 },
          {
            text: "Provincia:",
            bold: true,
            width: "auto",
            margin: [0, 0, 4, 0],
          },
          { text: data.provincia ?? "", width: "auto" },
        ],
        margin: [0, 4],
      },
      {
        columns: [
          {
            text: "Empresa:",
            bold: true,
            width: "auto",
            margin: [0, 0, 4, 0],
          },
          { text: data.empresa ?? "", width: "auto", margin: [0, 0, 4, 0] },
          {
            text: "CUIT de la empresa:",
            bold: true,
            width: "auto",
            margin: [0, 0, 4, 0],
          },
          { text: data.cuitEmpresa ?? "", width: "auto", margin: [0, 0, 4, 0] },
          {
            text: "Puesto:",
            bold: true,
            width: "auto",
            margin: [0, 0, 4, 0],
          },
          { text: data.puesto ?? "", width: "auto", margin: [0, 0, 4, 0] },
        ],
        margin: [0, 4],
      },
      {
        columns: [
          {
            text: "Lugar de trabajo:",
            bold: true,
            width: "auto",
            margin: [0, 0, 4, 0],
          },
          {
            text: data.calleEmpresa ?? "",
            width: "auto",
            margin: [0, 0, 4, 0],
          },
          {
            text: "Localidad:",
            bold: true,
            width: "auto",
            margin: [0, 0, 4, 0],
          },
          {
            text: data.localidadEmpresa ?? "",
            width: "auto",
            margin: [0, 0, 4, 0],
          },
          { text: "C.P.:", bold: true, width: "auto", margin: [0, 0, 4, 0] },
          { text: data.cpEmpresa ?? "", width: 30 },
          {
            text: "Provincia:",
            bold: true,
            width: "auto",
            margin: [0, 0, 4, 0],
          },
          { text: data.provinciaEmpresa ?? "", width: 80 },
        ],
        margin: [0, 4],
      },
      {
        text: "INFORMACIÓN MÉDICA",
        style: "subheader",
        margin: [0, 2, 0, 2],
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
            width: 20,
            margin: [0, 0, 4, 0],
          },
          {
            text: "Cuánto hace:",
            bold: true,
            width: "auto",
            margin: [0, 0, 4, 0],
          },
          {
            text: data.presionAltaDesde ?? "",
            width: "auto",
            margin: [0, 0, 4, 0],
          },
          { text: "Fuma:", bold: true, width: "auto", margin: [0, 0, 4, 0] },
          { text: data.fuma ? "Sí" : "No", width: 20, margin: [0, 0, 4, 0] },
          {
            text: "Cuántos por día:",
            bold: true,
            width: "auto",
            margin: [0, 0, 4, 0],
          },
          { text: data.cantFuma ?? "", width: "auto" },
        ],
        margin: [0, 4],
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
            width: 20,
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
        margin: [0, 4],
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
            width: 20,
            margin: [0, 0, 4, 0],
          },
          {
            text: "Cuáles:",
            bold: true,
            width: "auto",
            margin: [0, 0, 4, 0],
          },
          {
            text: data.operacionesCuales ?? "",
            width: "auto",
            margin: [0, 0, 4, 0],
          },
        ],
      },
      {
        columns: [
          {
            text: "Toma algún medicamento:",
            bold: true,
            width: "auto",
            margin: [0, 0, 4, 0],
          },
          {
            text: data.medicamentos ? "Sí" : "No",
            width: 20,
            margin: [0, 0, 4, 0],
          },
          {
            text: "Cuáles:",
            bold: true,
            width: "auto",
            margin: [0, 0, 4, 0],
          },
          {
            text: data.medicamentoCuales ?? "",
            width: "auto",
            margin: [0, 0, 4, 0],
          },
        ],
        margin: [0, 4],
      },
      {
        columns: [
          {
            text: "Es alérgico a medicamentos:",
            bold: true,
            width: "auto",
            margin: [0, 0, 4, 0],
          },
          {
            text: data.alergiasMedicamentos ? "Sí" : "No",
            width: 20,
            margin: [0, 0, 4, 0],
          },
          {
            text: "Cuáles:",
            bold: true,
            width: "auto",
            margin: [0, 0, 4, 0],
          },
          { text: data.alergiasMedicamentosCuales ?? "", width: "auto" },
        ],
        margin: [0, 4],
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

      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: "El afiliado confirma expresamente su decisión de derivar sus aportes de obra social a MGN Salud, y declara haber sido informado/a sobre las prestaciones médicas disponibles.",
                alignment: "center",
                margin: [6, 4, 6, 4],
                color: "#003366", // azul oscuro
                bold: true,
              },
            ],
          ],
        },
        layout: {
          hLineWidth: () => 1,
          vLineWidth: () => 1,
          hLineColor: () => "#003366",
          vLineColor: () => "#003366",
          paddingLeft: () => 8,
          paddingRight: () => 8,
          paddingTop: () => 6,
          paddingBottom: () => 6,
          fillColor: () => "#e6f0ff",
        },
        margin: [0, 3, 0, 3],
      },
      { text: "FAMILIARES", style: "subheader", margin: [0, 8, 0, 4] },

      {
        table: {
          widths: ["*", "*", "*", "*", "*"],
          body: [
            ["Parentesco", "Nombre", "Edad", "DNI", "Fecha de Nac"],
            ...(data.familiares ?? [])
              .slice(0, 5)
              .map((f: any) => [
                f.parentesco ?? "",
                f.nombre ?? "",
                f.edad ?? "",
                f.dni ?? "",
                f.fechaNac ?? "",
              ]),
          ],
        },
      },
      {
        columns: [
          {
            text: "Nombre asesor: ",
            bold: true,
            width: "auto",
            margin: [0, 20, 4, 0],
          },
          {
            text: data.asesor ?? "",
            width: 150,
            alignment: "left",
            margin: [0, 20, 4, 0],
          },
        ],
      },
      {
        columns: [
          {
            text: "Fecha: ",
            bold: true,
            width: "auto",
            margin: [0, 20, 4, 0],
          },
          {
            text: dayjs().format("DD/MM/YYYY"),
            margin: [0, 20, 8, 0],
            width: "auto",
          },
          {
            text: "Firma solicitante: ",
            bold: true,
            width: "auto",
            margin: [0, 20, 4, 0],
          },
          {
            image: firmaBase64,
            width: 150,
            margin: [0, 0, 0, 0],
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
};
