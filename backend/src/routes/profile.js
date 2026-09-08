import { Router } from "express";
import authMiddleWare from "../middlewares/authMiddleware";
const router = Router();
router.put("/", authMiddleWare, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "غير مصرح لك" });
    }
    const userId = req.user.userId;
    res.json({ message: "تم التحديث بنجاح" });
});
export default router;
