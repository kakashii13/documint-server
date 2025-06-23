import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      formularioData?: any;
    }
  }
}

export function parseFormData(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const rawData = JSON.parse(JSON.stringify(req.body)); // 🔧 fuerza a un objeto plano
  const parsedData: Record<string, any> = {};

  for (const key in rawData) {
    let value = rawData[key];

    // Intenta parsear si es JSON valido (arrays u objetos)
    try {
      const parsed = JSON.parse(value);
      parsedData[key] = parsed;
      continue;
    } catch {
      // No es JSON
      // console.log("Error");
    }

    // Convierte "true"/"false" a booleano
    if (value === "true") {
      value = true;
    } else if (value === "false") {
      value = false;
    }

    // Convierte numeros
    if (!isNaN(Number(value)) && value.trim() !== "") {
      value = Number(value);
    }

    parsedData[key] = value;
  }

  req.formularioData = parsedData;
  next();
}
