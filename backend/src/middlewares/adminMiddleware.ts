import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth.js";

export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return res.status(401).json({
      error: "غير مصرح، يرجى تسجيل الدخول أولاً",
    });
  }

  if (req.user.role?.toUpperCase() !== "ADMIN") {
    return res.status(403).json({
      error: "Access denied. Admins only.",
    });
  }

  next();
};
