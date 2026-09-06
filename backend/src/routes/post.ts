import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma";
import authMiddleWare from "../middlewares/authMiddleware";

const router = Router();

function calculateReadTime(content: string) {
  if (!content) return 1;
  const wordsCount = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordsCount / 200);
  return readTime < 1 ? 1 : readTime;
}

// 1. إنشاء مقال جديد
router.post("/", authMiddleWare, async (req: Request, res: Response) => {
  try {
    const { title, description, content, hashtags, imageUrl } = req.body;

    // الاعتماد على التوكن لمعرفة صاحب المقال
    const userId = req.user?.uid;

    if (!title || !content || !userId) {
      return res.status(400).json({
        error: "يرجى إرسال العنوان والمحتوى",
      });
    }

    const readTime = calculateReadTime(content);

    const newPost = await prisma.post.create({
      data: {
        title,
        description: description || "",
        content,
        hashtags: hashtags || [],
        readTime,
        imageUrl,
        authorId: userId,
        userId: userId,
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
});

// 2. جلب جميع المقالات
router.get("/", async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
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

// 3. جلب مقال محدد بواسطة الـ ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; // تحويل النوع صراحة لمنع الخطأ

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

    return res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return res.status(500).json({
      error: "حدث خطأ في السيرفر أثناء جلب المقال",
    });
  }
});

// 4. تعديل مقال (PUT)
router.put("/:id", authMiddleWare, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; // تحويل النوع صراحة لمنع الخطأ
    const { title, description, content, hashtags, imageUrl } = req.body;
    const currentUserId = req.user?.uid;

    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return res.status(404).json({ error: "المقال غير موجود" });
    }

    if (existingPost.authorId !== currentUserId) {
      return res.status(403).json({ error: "غير مصرح لك بتعديل هذا المقال" });
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
        hashtags: hashtags ?? existingPost.hashtags,
        imageUrl: imageUrl ?? existingPost.imageUrl,
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
});

// 5. حذف مقال (DELETE)
router.delete("/:id", authMiddleWare, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; // تحويل النوع صراحة لمنع الخطأ
    const currentUserId = req.user?.uid;

    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return res.status(404).json({ error: "المقال غير موجود" });
    }

    if (existingPost.authorId !== currentUserId) {
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
