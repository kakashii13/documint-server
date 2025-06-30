import { Request } from "express";

interface RequestCustom extends Request {
  user?: {
    id: number;
    email: string;
    name: string;
    hash_password?: string;
    role?: string;
    clientId?: number;
  };
}

interface User {
  id: number;
  email: string;
  name: string;
  hash_password: string;
  role?: string;
}

export { RequestCustom, User };
