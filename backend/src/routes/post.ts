import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma";
import authMiddleWare from "../middlewares/authMiddleware";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

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
  upload.single("image"),
  async (req: Request, res: Response): Promise<any> => {
    try {
      let { title, description, content, hashtags } = req.body;
      let parsedHashtags = hashtags || [];
      if (typeof hashtags === "string") {
        try {
          parsedHashtags = JSON.parse(hashtags);
        } catch (e) {
          parsedHashtags = [hashtags];
        }
      }

      const imageUrl = req.file
        ? `http://localhost:5000/uploads/${req.file.filename}`
        : req.body.imageUrl;
      const userId = req.user?.userId;

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
          hashtags: parsedHashtags,
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
  },
);

router.get("/", async (req: Request, res: Response): Promise<any> => {
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

router.get("/my-posts", authMiddleWare, async (req: Request, res: Response) => {
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

router.get("/:id", async (req: Request, res: Response) => {
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
  upload.single("image"),
  async (req: Request, res: Response) => {
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

      const imageUrl = req.file
        ? `http://localhost:5000/uploads/${req.file.filename}`
        : existingPost.imageUrl;

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

router.delete("/:id", authMiddleWare, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; // تحويل النوع صراحة لمنع الخطأ
    const currentUserId = req.user?.userId;
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
