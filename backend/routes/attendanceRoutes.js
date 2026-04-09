import express from "express";
import { getAttendanceByScholar, markAttendance, getAttendanceByCourse } from "../controllers/attendanceController.js";

const router = express.Router();

router.get("/scholar/:scholarId", getAttendanceByScholar);
router.get("/course/:courseId", getAttendanceByCourse);
router.post("/", markAttendance);

export default router;