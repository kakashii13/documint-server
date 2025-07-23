import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { User as PrismaUser } from "@prisma/client";

declare global {
  namespace Express {
    interface User extends PrismaUser {}
  }
}

interface RequestCustom extends Request {
  token?: string | null | JwtPayload;
  advisor?: {
    name: string;
    email: string;
    userId?: number;
    slug?: string;
  };
}

interface User {
  id?: number;
  email: string;
  name: string;
  hash_password?: string;
  role?: string;
  password?: string;
  active?: boolean;
  clientId?: number | null;
}

interface TokenPayload {
  userId: number;
  role: string;
  sessionId?: number;
}

export { RequestCustom, User, TokenPayload };
