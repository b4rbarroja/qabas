import { Router, type Response } from "express";
import authMiddleWare from "../middlewares/authMiddleware.js";
import { type AuthRequest } from "../types/auth.js";

const router = Router();

router.get("/", authMiddleWare, async (req: AuthRequest, res: Response) => {
  return res.status(200).json({
    authenticated: true,
    user: req.user,
  });
});

export default router;
