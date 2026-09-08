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

// PUT /api/users/profile - تحديث بيانات البروفايل والصورة
// users.ts
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
export default router;
