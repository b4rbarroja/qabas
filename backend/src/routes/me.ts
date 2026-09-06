import { Router, type Request, type Response } from "express";
import authMiddleWare from "../middlewares/authMiddleware";
const router = Router();

router.get("/", authMiddleWare, async (req: Request, res: Response) => {
  res.status(200).json({
    authenticated: true,
    user: req.user,
  });
});

export default router;
