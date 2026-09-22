import { Router, type Response } from "express";
import { prisma } from "../lib/prisma.js";
import authMiddleWare from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import { type AuthRequest } from "../types/auth.js";
import { isValidHttpUrl } from "../lib/url.js";

const router = Router();

// GET /api/users - جلب قائمة المستخدمين (للأدمن فقط)
router.get(
  "/",
  authMiddleWare,
  adminMiddleware,
  async (req: AuthRequest, res: Response) => {
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

router.get("/cu", authMiddleWare, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

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
  authMiddleWare,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      // الـ user يكون متاحاً هنا بعد المرور على authMiddleWare
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: "غير مصرح، يرجى تسجيل الدخول",
        });
        return;
      }

      const { name, specialization, bio, portfolioUrl, userImage } = req.body;

      const updateData: Record<string, any> = {};

      if (name !== undefined) updateData.name = name;
      if (specialization !== undefined)
        updateData.specialization = specialization;
      if (bio !== undefined) updateData.bio = bio;
      if (portfolioUrl !== undefined) updateData.portfolioUrl = portfolioUrl;

      if (userImage !== undefined) {
        if (userImage === "" || userImage === null) {
          updateData.userImage = null;
        } else if (!isValidHttpUrl(userImage)) {
          res.status(400).json({
            success: false,
            message: "رابط الصورة الشخصية غير صالح",
          });
          return;
        } else {
          updateData.userImage = userImage;
        }
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
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const currentUserId = req.user?.userId;
      const currentUserRole = req.user?.role;
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
