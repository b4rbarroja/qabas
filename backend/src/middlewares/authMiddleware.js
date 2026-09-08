import jwt from "jsonwebtoken";
const authMiddleWare = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ error: "Access denied. Token missing." });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};
export default authMiddleWare;
