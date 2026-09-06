import { Router, type Request, type Response } from "express";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "تم الخروج بنجاح" });
});

export default router;
