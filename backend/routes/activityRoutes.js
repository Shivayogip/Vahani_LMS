import express from "express";
import { getAllActivities, createActivity, updateActivity, deleteActivity } from "../controllers/activityController.js";

const router = express.Router();

router.get("/", getAllActivities);
router.post("/", createActivity);
router.put("/:id", updateActivity);
router.delete("/:id", deleteActivity);

export default router;