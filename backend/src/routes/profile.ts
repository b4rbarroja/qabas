import { Router, type Response } from "express";
import authMiddleWare from "../middlewares/authMiddleware.js";
import { type AuthRequest } from "../types/auth.js";

const router = Router();

router.put("/", authMiddleWare, async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "غير مصرح لك" });
  }

  const userId = req.user.userId;
  res.json({ message: "تم التحديث بنجاح" });
});

export default router;
