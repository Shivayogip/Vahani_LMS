import User from "../models/User.js";
import Course from "../models/Course.js";
import Assignment from "../models/Assignment.js";
import Submission from "../models/Submission.js";
import Attendance from "../models/Attendance.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalScholars = await User.countDocuments({ role: "scholar" });
    const activeProgrammes = await Course.countDocuments({ status: "Active" });
    const atRiskScholars = await User.find({ role: "scholar", status: "At Risk" });
    
    const courses = await Course.find();
    const avgCompletion = courses.length > 0 
      ? Math.round(courses.reduce((acc, c) => acc + (c.completion || 0), 0) / courses.length) 
      : 0;

    const distribution = {
      "1st Year": await User.countDocuments({ role: "scholar", year: "1st" }),
      "2nd Year": await User.countDocuments({ role: "scholar", year: "2nd" }),
      "3rd Year": await User.countDocuments({ role: "scholar", year: "3rd" }),
    };

    res.json({
      totalScholars,
      activeProgrammes,
      atRiskCount: atRiskScholars.length,
      atRiskScholars,
      avgCompletion,
      distribution,
      programmes: courses
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getScholarStats = async (req, res) => {
  try {
    const scholarId = req.user.id;
    const scholar = await User.findById(scholarId);
    
    if (!scholar) return res.status(404).json({ error: "Scholar not found" });

    // In a real app, we'd check enrollments. For now, let's assume all active courses
    const activeProgrammes = await Course.countDocuments({ status: "Active" });
    
    // Pending assignments (assignments with no submission from this scholar)
    const allAssignments = await Assignment.find({ status: "Open" });
    const submissions = await Submission.find({ scholar: scholarId });
    const submittedIds = submissions.map(s => s.assignment.toString());
    const pendingAssignments = allAssignments.filter(a => !submittedIds.includes(a._id.toString()));

    res.json({
      name: scholar.name,
      role: `${scholar.year} Year Scholar`,
      activeProgrammes,
      pendingCount: pendingAssignments.length,
      attendanceRate: scholar.attendance || 0,
      overallScore: scholar.score || 0,
      pendingAssignments: pendingAssignments.slice(0, 3) // Return first 3
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};