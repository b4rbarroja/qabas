import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();

// إعداد مجلد حفظ الصور للرفع Local (أو يمكنك استخدام Cloudinary / S3 لاحقاً)
const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `avatar-${uniqueSuffix}${ext}`);
  },
});

// تصفية الملفات للتأكد من أنها صور فقط
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("يُسمح فقط برفع ملفات الصور!"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // حد أقصى 5 ميجابايت
});

// استخدام الميدلوير upload.single("userImage") لاستقبال صورة واحدة
router.post(
  "/",
  upload.single("userImage"),
  async (req: Request, res: Response) => {
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

      // 2. معالجة رابط/مسار الصورة المرفوعة
      let userImagePath: string | null = null;
      if (req.file) {
        // المسار الذي سيتم تخزينه للوصول للصورة من الفرونت إند
        userImagePath = `/uploads/${req.file.filename}`;
      }

      // 3. تحويل selectedCategories إلى مصفوفة إذا جاءت كـ JSON string من FormData
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
          userImage: userImagePath,
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
  },
);

export default router;
