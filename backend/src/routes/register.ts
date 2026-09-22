import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import { isValidHttpUrl } from "../lib/url.js";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      bio,
      selectedCategories,
      specialization,
      portfolioUrl,
      agreeTerms,
      agreeOriginality,
      userImage,
    } = req.body;

    // 1. التحقق من وجود البريد الإلكتروني
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "هذا البريد الإلكتروني مُسجّل بالفعل",
      });
    }

    // 2. التحقق من رابط الصورة الشخصية (اختياري)
    let userImageUrl: string | null = null;
    if (userImage) {
      if (!isValidHttpUrl(userImage)) {
        return res.status(400).json({
          success: false,
          error: "رابط الصورة الشخصية غير صالح",
        });
      }
      userImageUrl = userImage;
    }

    // 3. تحويل selectedCategories إلى مصفوفة (أو JSON string للتوافق)
    let parsedCategories: string[] = [];
    if (typeof selectedCategories === "string") {
      try {
        parsedCategories = JSON.parse(selectedCategories);
      } catch {
        parsedCategories = [];
      }
    } else if (Array.isArray(selectedCategories)) {
      parsedCategories = selectedCategories;
    }

    // 4. تشفير كلمة المرور وإنشاء المستخدم
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        bio,
        selectedCategories: parsedCategories,
        specialization,
        portfolioUrl,
        userImage: userImageUrl,
        agreeTerms: agreeTerms === "true" || agreeTerms === true,
        agreeOriginality:
          agreeOriginality === "true" || agreeOriginality === true,
        role: "USER",
      },
    });

    // استبعاد كلمة المرور من الاستجابة للحدث الأمني
    const { password: _, ...userWithoutPassword } = createdUser;

    return res.status(201).json({
      success: true,
      message: "تم إنشاء الحساب بنجاح",
      user: userWithoutPassword,
    });
  } catch (err: any) {
    console.error("Register Error:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "حدث خطأ في السيرفر أثناء التسجيل",
    });
  }
});

export default router;
