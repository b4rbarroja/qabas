import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import messagesRouter from "./routes/contact.js";
import registerRouter from "./routes/register.js";
import usersRouter from "./routes/users.js";
import loginRouter from "./routes/login.js";
import logoutRouter from "./routes/logout.js";
import postRouter from "./routes/post.js";
import currentUser from "./routes/me.js";
import profileRouter from "./routes/profile.js";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use("/api/messages", messagesRouter);
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);

app.use("/api/users", usersRouter);
app.use("/api/posts", postRouter);
app.use("/api/auth/me", currentUser);
app.use("/api/auth/profile", profileRouter);

export default app;

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
}
