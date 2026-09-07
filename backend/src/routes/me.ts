import { Router, type Response } from "express";
import authMiddleWare, {
  type AuthenticatedRequest,
} from "../middlewares/authMiddleware";

const router = Router();

router.get(
  "/",
  authMiddleWare,
  async (req: AuthenticatedRequest, res: Response) => {
    return res.status(200).json({
      authenticated: true,
      user: req.user,
    });
  },
);

export default router;
