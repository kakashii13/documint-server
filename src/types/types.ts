import { Request } from "express";

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

export { RequestCustom, User };
