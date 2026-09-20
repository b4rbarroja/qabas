import { Request, Response, NextFunction } from "express";

export const adminMiddleware = (
  req: Request,
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
