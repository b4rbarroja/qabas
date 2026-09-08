import { Router } from "express";
const router = Router();
router.post("/", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "تم الخروج بنجاح" });
});
export default router;
