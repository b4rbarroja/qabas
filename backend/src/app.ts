import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// استيراد الـ Routers
import messagesRouter from "../src/routes/contact.js";
import registerRouter from "../src/routes/register.js";
import usersRouter from "../src/routes/users.js";
import loginRouter from "../src/routes/login.js";
import logoutRouter from "../src/routes/logout.js";
import postRouter from "../src/routes/post.js";
import currentUser from "../src/routes/me.js";
import profileRouter from "../src/routes/profile.js";

const PORT = 5000;
const app: Express = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
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

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
