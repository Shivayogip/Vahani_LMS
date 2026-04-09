import express from "express";
import { getAllScholars, getAllTrainers, getUserById, updateUser, deleteUser, getProfile, updateProfile } from "../controllers/userController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);
router.get("/scholars", getAllScholars);
router.get("/trainers", getAllTrainers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;