import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";

import messagesRouter from "./routes/contact.js";
import registerRouter from "./routes/register.js";
import usersRouter from "./routes/users.js";
import loginRouter from "./routes/login.js";
import logoutRouter from "./routes/logout.js";
import postRouter from "./routes/post.js";
import currentUser from "./routes/me.js";
import pendingPosts from "./routes/pending.js";
import reports from "./routes/report.js";

const app: Express = express();

app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  ...(
    process.env.FRONTEND_URL ||
    process.env.CLIENT_URL ||
    "https://qabasun.vercel.app"
  )
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  }),
);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many attempts, please try again later.",
  },
});

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many registration attempts, please try again later.",
  },
});

const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests, please try again later.",
  },
});

app.use("/api/messages", writeLimiter, messagesRouter);
app.use("/api/register", registerLimiter, registerRouter);
app.use("/api/login", authLimiter, loginRouter);
app.use("/api/logout", logoutRouter);

app.use("/api/users", usersRouter);
app.use("/api/posts", postRouter);
app.use("/api/auth/me", currentUser);
app.use("/api/pendingPosts", pendingPosts);
app.use("/api/report", writeLimiter, reports);

// تشغيل الـ PORT فقط أثناء التطوير المحلي (Local Development)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
}

export default app;
