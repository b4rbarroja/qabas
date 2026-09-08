import express from "express";
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
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use(cors({
    origin: process.env.CLIENT_URL || true,
    credentials: true,
}));
app.use("/api/messages", messagesRouter);
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postRouter);
app.use("/api/auth/me", currentUser);
app.use("/api/auth/profile", profileRouter);
// Vercel invokes the exported app as a serverless function.
export default app;
// Keep `npm run dev` working locally without starting a listener on Vercel.
if (process.env.VERCEL !== "1") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Backend server running on port ${PORT}`);
    });
}
