import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  scholar: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["Present", "Absent", "Late"], default: "Present" },
  sessionTitle: String
}, { timestamps: true });

export default mongoose.model("Attendance", attendanceSchema);