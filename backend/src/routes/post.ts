import { Router, type Response } from "express";
import { prisma } from "../lib/prisma.js";
import authMiddleWare, {
  getAuthenticatedUser,
} from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import { type AuthRequest } from "../types/auth.js";
import { isValidHttpUrl } from "../lib/url.js";

const router = Router();

function calculateReadTime(content: string) {
  if (!content) return 1;
  const wordsCount = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordsCount / 200);
  return readTime < 1 ? 1 : readTime;
}

router.post(
  "/",
  authMiddleWare,
  async (req: AuthRequest, res: Response): Promise<any> => {
    try {
      let { title, description, content, hashtags, imageUrl } = req.body;
      let parsedHashtags = hashtags || [];
      if (typeof hashtags === "string") {
        try {
          parsedHashtags = JSON.parse(hashtags);
        } catch (e) {
          parsedHashtags = [hashtags];
        }
      }

      const userId = req.user?.userId;

      if (!title || !content || !userId) {
        return res.status(400).json({
          error: "يرجى إرسال العنوان والمحتوى",
        });
      }

      if (imageUrl) {
        if (!isValidHttpUrl(imageUrl)) {
          return res.status(400).json({ error: "رابط الصورة غير صالح" });
        }
      } else {
        imageUrl = null;
      }

      const readTime = calculateReadTime(content);
      const newPost = await prisma.post.create({
        data: {
          title,
          description: description || "",
          content,
          hashtags: parsedHashtags,
          readTime,
          imageUrl,
          authorId: userId,
          userId: userId,
          status: "PENDING",
        },

        include: {
          author: {
            select: {
              id: true,
              name: true,
              specialization: true,
              bio: true,
              userImage: true,
            },
          },
        },
      });

      return res.status(201).json(newPost);
    } catch (error) {
      console.error("Error creating post:", error);
      return res
        .status(500)
        .json({ error: "حدث خطأ في السيرفر أثناء إنشاء المقال" });
    }
  },
);

router.get("/", async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const requester = getAuthenticatedUser(req);
    const isAdmin = requester?.role === "ADMIN";

    const posts = await prisma.post.findMany({
      where: {
        status: isAdmin
          ? { in: ["PENDING", "APPROVED", "REJECTED"] }
          : { in: ["PENDING", "APPROVED"] },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            specialization: true,
            userImage: true,
            bio: true,
          },
        },
      },
    });

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res
      .status(500)
      .json({ error: "حدث خطأ في السيرفر أثناء جلب المقالات" });
  }
});

router.get("/my-posts", authMiddleWare, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "غير مصرح لك بالوصول" });
    }

    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            specialization: true,
            userImage: true,
            bio: true,
          },
        },
      },
    });

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return res
      .status(500)
      .json({ error: "حدث خطأ في السيرفر أثناء جلب المقالات" });
  }
});

router.get("/:id", async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;

    const post = await prisma.post.findUnique({
      where: { id },

      include: {
        author: {
          select: {
            id: true,
            name: true,
            specialization: true,
            bio: true,
            userImage: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ error: "المقال غير موجود" });
    }

    // المقالات المنشورة (PENDING / APPROVED) متاحة للجميع فوراً؛
    // REJECTED مخفية إلا للكاتب أو الأدمن
    if (post.status === "REJECTED") {
      const requester = getAuthenticatedUser(req);
      if (!requester) {
        return res.status(401).json({ error: "غير مصرح لك بعرض هذا المقال" });
      }
      if (
        post.authorId !== requester.userId &&
        requester.role !== "ADMIN"
      ) {
        return res.status(403).json({ error: "غير مصرح لك بعرض هذا المقال" });
      }
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);

    return res.status(500).json({
      error: "حدث خطأ في السيرفر أثناء جلب المقال",
    });
  }
});

// 4. تعديل مقال (PUT)

router.put(
  "/:id",
  authMiddleWare,
  async (req: AuthRequest, res: Response) => {
    try {
      const id = req.params.id as string;
      let { title, description, content, hashtags } = req.body;
      const currentUserId = req.user?.userId;

      const existingPost = await prisma.post.findUnique({
        where: { id },
      });

      if (!existingPost) {
        return res.status(404).json({ error: "المقال غير موجود" });
      }
      if (existingPost.authorId !== currentUserId) {
        return res.status(403).json({ error: "غير مصرح لك بتعديل هذا المقال" });
      }

      let parsedHashtags = existingPost.hashtags;
      if (hashtags) {
        try {
          parsedHashtags =
            typeof hashtags === "string" ? JSON.parse(hashtags) : hashtags;
        } catch (e) {
          parsedHashtags = [hashtags];
        }
      }

      let imageUrl = existingPost.imageUrl;
      if (req.body.imageUrl !== undefined) {
        const value = req.body.imageUrl;
        if (value === "" || value === null) {
          imageUrl = null;
        } else if (!isValidHttpUrl(value)) {
          return res.status(400).json({ error: "رابط الصورة غير صالح" });
        } else {
          imageUrl = value;
        }
      }

      const readTime = content
        ? calculateReadTime(content)
        : existingPost.readTime;

      const updatedPost = await prisma.post.update({
        where: { id },
        data: {
          title: title ?? existingPost.title,
          description: description ?? existingPost.description,
          content: content ?? existingPost.content,
          hashtags: parsedHashtags,
          imageUrl,
          readTime,
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              specialization: true,
              bio: true,
              userImage: true,
            },
          },
        },
      });

      return res.status(200).json(updatedPost);
    } catch (error) {
      console.error("Error updating post:", error);
      return res
        .status(500)
        .json({ error: "حدث خطأ في السيرفر أثناء تعديل المقال" });
    }
  },
);

// 5. تغيير وسم التحقق (PENDING/APPROVED) أو الإخفاء (REJECTED) - للأدمن فقط
router.patch(
  "/:id/status",
  authMiddleWare,
  adminMiddleware,
  async (req: AuthRequest, res: Response): Promise<any> => {
    try {
      const id = req.params.id as string;
      const { status } = req.body;

      if (
        status !== "PENDING" &&
        status !== "APPROVED" &&
        status !== "REJECTED"
      ) {
        return res.status(400).json({ error: "الحالة غير صالحة" });
      }

      const existingPost = await prisma.post.findUnique({
        where: { id },
      });

      if (!existingPost) {
        return res.status(404).json({ error: "المقال غير موجود" });
      }

      const updatedPost = await prisma.post.update({
        where: { id },
        data: { status },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              specialization: true,
              bio: true,
              userImage: true,
            },
          },
        },
      });

      return res.status(200).json(updatedPost);
    } catch (error) {
      console.error("Error updating post status:", error);
      return res
        .status(500)
        .json({ error: "حدث خطأ في السيرفر أثناء تحديث حالة المقال" });
    }
  },
);

router.delete("/:id", authMiddleWare, async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const currentUserId = req.user?.userId;
    const currentUserRole = req.user?.role; // جلب دور المستخدم الحالي

    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return res.status(404).json({ error: "المقال غير موجود" });
    }

    // السماح بالحذف إذا كان كاتب المقال أو كان أدمن
    const isAuthor = existingPost.authorId === currentUserId;
    const isAdmin = currentUserRole === "ADMIN";

    if (!isAuthor && !isAdmin) {
      return res.status(403).json({ error: "غير مصرح لك بحذف هذا المقال" });
    }

    await prisma.post.delete({
      where: { id },
    });

    return res.status(200).json({ message: "تم حذف المقال بنجاح" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res
      .status(500)
      .json({ error: "حدث خطأ في السيرفر أثناء حذف المقال" });
  }
});

export default router;
