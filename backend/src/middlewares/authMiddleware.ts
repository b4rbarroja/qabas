import express, {
  type Express,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import jwt from "jsonwebtoken";

const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      uid: string;
      role: string;
    };

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json(`authorization error:${error} `);
  }
};

export default authMiddleWare;
