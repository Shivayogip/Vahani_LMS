import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  scholar: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment" },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  score: { type: Number, required: true },
  totalPoints: { type: Number, required: true },
  feedback: String,
  date: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Result", resultSchema);