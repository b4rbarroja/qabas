import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

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
      userImage,
      agreeTerms,
      agreeOriginality,
    } = req.body;

    // 1. التحقق من وجود البريد الإلكتروني
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "هذا البريد الإلكتروني مُسجّل بالفعل" });
    }

    // 2. تشفير كلمة المرور وإنشاء المستخدم
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        bio,
        selectedCategories: selectedCategories || [],
        specialization,
        portfolioUrl,
        userImage,
        agreeTerms: agreeTerms ?? false,
        agreeOriginality: agreeOriginality ?? false,
        role: "USER",
      },
    });

    // 3. إرجاع الاستجابة بنجاح (مع استخدام status 201 لعمليات الإنشاء)
    return res.status(201).json({
      success: true,
      message: "تم إنشاء الحساب بنجاح",
      user: createdUser,
    });
  } catch (err) {
    console.error("Register Error:", err);
    return res.status(500).json({
      success: false,
      error: "حدث خطأ في السيرفر أثناء التسجيل",
    });
  }
});

export default router;
