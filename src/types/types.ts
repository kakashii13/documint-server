import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

interface RequestCustom extends Request {
  user?: {
    id: number;
    email: string;
    name: string;
    hash_password?: string;
    role?: string;
    clientId?: number;
    active?: boolean;
  };
  token?: string | null | JwtPayload;
}

interface User {
  id: number;
  email: string;
  name: string;
  hash_password: string;
  role?: string;
  password?: string;
  active?: boolean;
}

interface TokenPayload {
  userId: number;
  role: string;
}

export { RequestCustom, User, TokenPayload };
