import { Router, type Response } from "express";
import { prisma } from "../lib/prisma.js";
import authMiddleWare from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import { type AuthRequest } from "../types/auth.js";
import discordSender from "../services/discord.js";

const router = Router();

// قراءة رسائل التواصل - للأدمن فقط
router.get(
  "/",
  authMiddleWare,
  adminMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const messages = await prisma.message.findMany();
      res.status(200).json(messages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Failed to fetch messages: ${error}` });
    }
  },
);

router.post("/", async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are needed" });
    }

    const newMessage = await prisma.message.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    try {
      await discordSender({ name, email, subject, message });
    } catch (discordError) {
      console.error("Discord Notification Error:", discordError);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ error: `Can't create the message: ${error}` });
  }
});

export default router;
