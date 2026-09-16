import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma.js";
import authMiddleWare from "../middlewares/authMiddleware.js";
import multer from "multer";
import path from "path";

const router = Router();

// إعداد التخزين لـ Multer (Storage Configuration)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // المجلد الذي تحفظ فيه الصور
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// GET /api/users - جلب قائمة المستخدمين
router.get("/", authMiddleWare, async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        specialization: true,
        userImage: true,
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

router.get("/cu", authMiddleWare, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId || (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ error: "غير مصرح لك بالوصول لهذا" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        specialization: true,
        portfolioUrl: true,
        userImage: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "لا يوجد مستخدم بهذا الـ ID" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ error: "حدث خطأ في السيرفر" });
  }
});

router.put(
  "/profile",
  upload.single("userImage"), // 1. استخراج الملف والـ FormData أولاً
  authMiddleWare, // 2. التحقق من التوكن بعد معالجة الـ Body/Headers
  async (req: Request, res: Response): Promise<void> => {
    try {
      // الـ user يكون متاحاً هنا بعد المرور على authMiddleWare
      const userId =
        (req as any).user?.id ||
        (req as any).user?.userId ||
        (req as any).user?.uid;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: "غير مصرح، يرجى تسجيل الدخول",
        });
        return;
      }

      const { name, specialization, bio, portfolioUrl } = req.body;

      const updateData: Record<string, any> = {};

      if (name !== undefined) updateData.name = name;
      if (specialization !== undefined)
        updateData.specialization = specialization;
      if (bio !== undefined) updateData.bio = bio;
      if (portfolioUrl !== undefined) updateData.portfolioUrl = portfolioUrl;

      if (req.file) {
        updateData.userImage = `/uploads/${req.file.filename}`;
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
        select: {
          id: true,
          name: true,
          email: true,
          bio: true,
          specialization: true,
          userImage: true,
          portfolioUrl: true,
          role: true,
        },
      });

      res.status(200).json({
        success: true,
        message: "تم تحديث الملف الشخصي بنجاح",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Update profile error:", error);

      res.status(500).json({
        success: false,
        message: "فشل تحديث بيانات الملف الشخصي",
      });
    }
  },
);

// DELETE /api/users/:id - حذف مستخدم (للأدمن فقط)
router.delete(
  "/:id",
  authMiddleWare,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const currentUserId = (req as any).user?.userId || (req as any).user?.id;
      const currentUserRole = (req as any).user?.role;
      const targetUserId = req.params.id as string;

      // التحقق من أن المجرّي للعملية هو أدمن
      if (currentUserRole !== "ADMIN") {
        res.status(403).json({
          success: false,
          message: "غير مصرح لك ببدء عملية الحذف، الصلاحية للأدمن فقط",
        });
        return;
      }

      // منع الأدمن من حذف نفسه
      if (String(currentUserId) === String(targetUserId)) {
        res.status(400).json({
          success: false,
          message: "لا يمكنك حذف حسابك الشخصي من هنا",
        });
        return;
      }

      // التأكد من وجود المستخدم المراد حذفه
      const existingUser = await prisma.user.findUnique({
        where: { id: targetUserId },
      });

      if (!existingUser) {
        res.status(404).json({
          success: false,
          message: "المستخدم غير موجود",
        });
        return;
      }

      // تنفيذ عملية الحذف
      await prisma.user.delete({
        where: { id: targetUserId },
      });

      res.status(200).json({
        success: true,
        message: "تم حذف المستخدم بنجاح",
      });
    } catch (error) {
      console.error("Delete user error:", error);
      res.status(500).json({
        success: false,
        message: "حدث خطأ في السيرفر أثناء حذف المستخدم",
      });
    }
  },
);

export default router;
