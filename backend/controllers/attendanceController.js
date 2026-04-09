import Attendance from "../models/Attendance.js";

export const getAttendanceByScholar = async (req, res) => {
  try {
    const attendance = await Attendance.find({ scholar: req.params.scholarId }).populate("course", "name");
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const markAttendance = async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAttendanceByCourse = async (req, res) => {
  try {
    const attendance = await Attendance.find({ course: req.params.courseId }).populate("scholar", "name");
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};