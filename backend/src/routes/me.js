import { Router } from "express";
import authMiddleWare from "../middlewares/authMiddleware";
const router = Router();
router.get("/", authMiddleWare, async (req, res) => {
    return res.status(200).json({
        authenticated: true,
        user: req.user,
    });
});
export default router;
