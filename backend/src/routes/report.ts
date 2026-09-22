import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma.js";
import authMiddleWare from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { postId, reason } = req.body;

    const createdReport = await prisma.reports.create({
      data: {
        postId,
        reason,
      },
    });
    res.status(200).json(`the report has sent successfully!`);
  } catch (error) {
    console.error("Error Making report:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const reports = await prisma.reports.findMany();
    return res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body;

    if (!id) {
      res.status(400).json({ message: "معرّف البلاغ (id) مطلوب." });
      return;
    }

    const deletedReport = await prisma.reports.delete({
      where: {
        id: String(id),
      },
    });

    res.status(200).json({
      message: "تم حذف البلاغ بنجاح",
      data: deletedReport,
    });
  } catch (error: any) {
    console.error("خطأ أثناء حذف البلاغ:", error);

    if (error.code === "P2025") {
      res.status(404).json({ message: "لم يتم العثور على البلاغ للحذف." });
      return;
    }

    res.status(500).json({ message: "حدث خطأ في السيرفر أثناء حذف البلاغ." });
  }
});

export default router;
