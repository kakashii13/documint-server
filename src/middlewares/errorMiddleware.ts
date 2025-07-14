import z from "zod";
import { HttpException } from "../services/httpException";
import { Request, Response, NextFunction } from "express";

export const errorManager = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message = "Internal server error";

  if (error instanceof z.ZodError) {
    message = error.errors[0].message;
  } else {
    message = error.message;
  }

  const statusCode = error.errorCode || 500;

  console.log("From handleErrors -> ", error.message);

  res.status(statusCode).send({
    status: statusCode,
    message,
  });
};
