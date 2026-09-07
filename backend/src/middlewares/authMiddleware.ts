import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";

// 1. تصحيح الـ Interface لتطابق البيانات الفعلية في التوكن
export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string; // 👈 تغيير uid إلى userId
    role: string;
  };
}

const authMiddleWare = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: "Access denied. Token missing." });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback_secret",
    ) as {
      userId: string;
      role: string;
    };

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default authMiddleWare;
