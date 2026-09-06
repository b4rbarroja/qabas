import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma";
import authMiddleWare from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleWare, async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        specialization: true,
        avatar: true,
        selectedCategories: true,
        portfolioUrl: true,
        agreeTerms: true,
        agreeOriginality: true,
        role: true,
      },
    });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Get users error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
});

export default router;
