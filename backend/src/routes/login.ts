import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const storedUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!storedUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, storedUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: storedUser.id,
        role: storedUser.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      },
    );
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      token,
      role: storedUser.role,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
});

export default router;
