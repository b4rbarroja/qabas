import express, {
  type Express,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import jwt from "jsonwebtoken";

const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.message = decoded;
    next();
  } catch (error) {
    res.status(500).json(`authorization error:${error} `);
  }
};

export default authMiddleWare;
