import { Router, type Request, type Response } from "express";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  const isProduction = process.env.NODE_ENV === "production";
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
  });
  res.json({ message: "تم الخروج بنجاح" });
});

export default router;
