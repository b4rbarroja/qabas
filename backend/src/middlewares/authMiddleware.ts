import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import { type AuthRequest, type UserPayload } from "../types/auth.js";

export function extractToken(req: Request): string | undefined {
  const authHeader = req.headers.authorization;
  if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
    return authHeader.slice("Bearer ".length);
  }
  return req.cookies?.token;
}

export function getAuthenticatedUser(req: Request): UserPayload | null {
  const token = extractToken(req);
  if (!token) return null;
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET is not configured");
    return null;
  }
  try {
    return jwt.verify(token, secret) as UserPayload;
  } catch {
    return null;
  }
}

const authMiddleWare = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).json({ error: "Access denied. Token missing." });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET is not configured");
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    req.user = jwt.verify(token, secret) as UserPayload;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default authMiddleWare;
