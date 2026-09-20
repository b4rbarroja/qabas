import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma";
import authMiddleWare from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const router = Router();

router.get(
  "/",
  authMiddleWare,
  adminMiddleware,
  async (req: Request, res: Response) => {
    try {
      const pendingPosts = await prisma.post.findMany({
        where: {
          status: "PENDING",
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              userImage: true,
              specialization: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).json(pendingPosts);
    } catch (error) {
      console.error("Error fetching pending posts:", error);
      return res
        .status(500)
        .json({ error: "حدث خطأ في الخادم أثناء جلب المقالات المعلقة" });
    }
  },
);

export default router;
