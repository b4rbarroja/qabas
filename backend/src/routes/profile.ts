import { Router, type Request, type Response } from "express";
import authMiddleWare from "../middlewares/authMiddleware";

const router = Router();

router.put("/", authMiddleWare, async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "غير مصرح لك" });
  }

  const userId = req.user.uid;
  res.json({ message: "تم التحديث بنجاح" });
});

export default router;
