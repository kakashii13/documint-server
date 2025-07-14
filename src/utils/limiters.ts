import { RequestHandler } from "express";
import rateLimit from "express-rate-limit";

export const makeLimiter = (max: number, windowMin = 15): RequestHandler => {
  return rateLimit({
    windowMs: windowMin * 60 * 1000,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Demasiados intentos, probá más tarde." },
  });
};
