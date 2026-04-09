import express from "express";
import { getAdminStats, getScholarStats } from "../controllers/statsController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/admin", getAdminStats);
router.get("/scholar", verifyToken, getScholarStats);

export default router;