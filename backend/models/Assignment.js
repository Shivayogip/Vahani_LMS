import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  due: { type: Date, required: true },
  dueTime: { type: String, default: "23:59" },
  status: { type: String, enum: ["Open", "Closed"], default: "Open" },
  points: { type: Number, default: 0 },
  instructions: String,
  checklist: [String],
  totalSubmissions: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Assignment", assignmentSchema);