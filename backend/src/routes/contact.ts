import express, { type Express, type Request, type Response } from "express";
import { prisma } from "../lib/prisma";
import authMiddleWare from "../middlewares/authMiddleware";

const router = express();

router.get("/", authMiddleWare, async (req: Request, res: Response) => {
  try {
    const messages = await prisma.message.findMany();
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json(`Failed to fetch messages due to error ${error}`);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, title, content } = req.body;
    const newMessage = await prisma.message.create({
      data: {
        name,
        email,
        title,
        content,
      },
    });
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json(`Can't create the message due to error: ${error}`);
  }
});

export default router;
