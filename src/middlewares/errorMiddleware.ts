import { HttpException } from "../services/httpException";
import { Request, Response, NextFunction } from "express";

export const errorManager = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.errorCode || 500;
  const message = error.message || "Internal Server Error";

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });

  console.log(error);
  next();
};
