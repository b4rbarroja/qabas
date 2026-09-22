import { Request } from "express";

export interface UserPayload {
  userId: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}
